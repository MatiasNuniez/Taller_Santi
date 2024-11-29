import { Request, Response } from "express"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { VentaInterface } from "../interfaces/ventaInterface";
import { ventaModel } from "../models/ventaModel";
import { productModel } from "../models/productsModel";

export class CartController {
    private client: MercadoPagoConfig;
    private preference: Preference

    constructor() {
        this.client = new MercadoPagoConfig({ accessToken: 'TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690' });
        this.preference = new Preference(this.client);
    }

    public async getDataPayment(req: Request, res: Response): Promise<void> {
        const { items, total } = req.body;
    
        if (!items || items.length === 0 || !total) {
            res.status(400).json({ message: 'Datos incompletos para procesar el pago.' });
            return;
        }
    
        try {
            const body = {
                items: items.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    unit_price: item.unit_price,
                    quantity: item.quantity,
                    description: item.description,
                    currency_id: item.currency_id || 'ARS',
                })),
                back_urls: {
                    success: 'http://localhost:3001',
                    failure: '',
                    pending: ''
                },
                auto_return: 'approved',
                binary_mode: true,
                notification_url: 'https://4ce0-190-136-150-11.ngrok-free.app/api/paymentInfo',
                payer: {
                    email: req.body.email || "comprador@mail.com",
                },
            };
    
            const result = await this.preference.create({ body });
    
            if (result) {
                res.status(200).json(result.init_point);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al procesar el pago' });
        }
    }
    
    

    public async paymentNotification(req: Request, res: Response): Promise<void> {
        try {
            const paymentInfo = req.body;
    
            console.log(paymentInfo);
    
            if (paymentInfo && paymentInfo.type === "payment") {
                const paymentId = paymentInfo.data.id;
    
                // Obtener detalles del pago desde la API de MercadoPago
                const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                    headers: {
                        Authorization: `Bearer TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Error al consultar el pago: ${response.status} ${response.statusText}`);
                }
    
                const paymentDetails = await response.json();
                console.log("datos del pago", paymentDetails);
    
                // Validar si el pago fue aprobado
                if (paymentDetails.status === "approved") {
                    // Registrar la venta en el modelo de ventas
                    const nuevaVenta: VentaInterface = {
                        fecha: Date.now(),
                        idVenta: paymentDetails.id,
                        total: paymentDetails.transaction_amount,
                    };
                    await ventaModel.create(nuevaVenta);
    
                    // Iterar sobre los productos comprados
                    const items = paymentDetails.additional_info.items;
    
                    for (const item of items) {
                        const productId = item.id; // ID del producto
                        const quantityPurchased = item.quantity; // Cantidad comprada
    
                        // Buscar el producto en la base de datos
                        const product = await productModel.findById(productId);
    
                        if (!product) {
                            console.warn(`Producto con ID ${productId} no encontrado.`);
                            continue;
                        }
    
                        // Verificar stock disponible
                        if (product.cantidad < quantityPurchased) {
                            console.warn(
                                `Stock insuficiente para el producto ${productId}. Stock actual: ${product.cantidad}, solicitado: ${quantityPurchased}`
                            );
                            continue; // Salta a la siguiente iteración si no hay suficiente stock
                        }
    
                        // Calcular nueva cantidad
                        const updatedQuantity = product.cantidad - quantityPurchased;
    
                        // Actualizar la cantidad en la base de datos
                        await productModel.findByIdAndUpdate(productId, { cantidad: updatedQuantity });
    
                        console.log(
                            `Producto ${productId} actualizado. Stock restante: ${updatedQuantity}`
                        );
                    }
                }
            }
    
            res.status(200).send("Notificación procesada correctamente");
        } catch (error) {
            console.error("Error procesando la notificación:", error);
            res.status(500).send("Error procesando la notificación");
        }
    }    

}