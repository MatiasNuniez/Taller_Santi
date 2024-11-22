import { Request, Response } from "express"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { VentaInterface } from "../interfaces/ventaInterface";
import { ventaModel } from "../models/ventaModel";
import { productVentaInterface } from "../interfaces/productVentas";

export class CartController {
    private client: MercadoPagoConfig;
    private preference: Preference

    constructor() {
        this.client = new MercadoPagoConfig({ accessToken: 'TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690' });
        this.preference = new Preference(this.client);
    }

    public async getDataPayment(req: Request, res: Response): Promise<void> {
        const { amount, description, id } = req.body;

        console.log('Amount:', amount, 'Description:', description), 'Id:', id;

        if (!amount || !description || !id) {
            res.status(400).json({ message: 'Error al recibir los datos del pago' });
            return;
        }

        try {
            let body = {
                items: [
                    {
                        id: id,
                        title: "Total de carrito",
                        unit_price: amount,
                        quantity: 1,
                        description: description,
                        currency_id: 'ARS'
                    }],
                back_urls: {
                    success: 'http://localhost:3001',
                    failure: '',
                    pending: ''
                },
                auto_return: 'approved',
                binary_mode: true,
                notification_url: 'https://cdb8-190-136-150-11.ngrok-free.app/api/paymentInfo'
            }
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

            // Verifica el estado del pago
            if (paymentInfo && paymentInfo.type === "payment") {
                const paymentId = paymentInfo.data.id;


                // Consulta los detalles del pago a MercadoPago
                const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                    headers: {
                        Authorization: `Bearer TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690`,
                    },
                });

                console.log(response);

                if (!response.ok) {
                    throw new Error(`Error al consultar el pago: ${response.status} ${response.statusText}`);
                }

                const paymentDetails = await response.json();

                console.log("datos del pago", paymentDetails);


                if (paymentDetails.status === "approved") {
                    const nuevaVenta: VentaInterface = {
                        fecha: Date.now(),
                        idVenta: paymentDetails.id,
                        total: paymentDetails.additional_info.items[0].unit_price
                    }

                    const nuevaVentaInfo = await ventaModel.create(nuevaVenta)

                    console.log(nuevaVentaInfo);

                }
            }
            res.status(200).send("Notificación procesada correctamente");
        } catch (error) {
            console.error("Error procesando la notificación:", error);
            res.status(500).send("Error procesando la notificación");
        }
    }

}