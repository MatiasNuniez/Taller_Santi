"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const mercadopago_1 = require("mercadopago");
const ventaModel_1 = require("../models/ventaModel");
const productsModel_1 = require("../models/productsModel");
class CartController {
    constructor() {
        this.client = new mercadopago_1.MercadoPagoConfig({ accessToken: 'TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690' });
        this.preference = new mercadopago_1.Preference(this.client);
    }
    getDataPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { items, total } = req.body;
            if (!items || items.length === 0 || !total) {
                res.status(400).json({ message: 'Datos incompletos para procesar el pago.' });
                return;
            }
            try {
                const body = {
                    items: items.map((item) => ({
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
                    notification_url: 'https://c461-190-136-150-11.ngrok-free.app/api/paymentInfo',
                    payer: {
                        email: req.body.email || "comprador@mail.com",
                    },
                };
                const result = yield this.preference.create({ body });
                if (result) {
                    res.status(200).json(result.init_point);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al procesar el pago' });
            }
        });
    }
    paymentNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentInfo = req.body;
                console.log(paymentInfo);
                if (paymentInfo && paymentInfo.type === "payment") {
                    const paymentId = paymentInfo.data.id;
                    const response = yield fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                        headers: {
                            Authorization: `Bearer TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`Error al consultar el pago: ${response.status} ${response.statusText}`);
                    }
                    const paymentDetails = yield response.json();
                    console.log("datos del pago", paymentDetails);
                    if (paymentDetails.status === "approved") {
                        const nuevaVenta = {
                            fecha: Date.now(),
                            idVenta: paymentDetails.id,
                            total: paymentDetails.transaction_amount,
                        };
                        yield ventaModel_1.ventaModel.create(nuevaVenta);
                        const items = paymentDetails.additional_info.items;
                        for (const item of items) {
                            const productId = item.id;
                            const quantityPurchased = item.quantity;
                            const product = yield productsModel_1.productModel.findById(productId);
                            if (!product) {
                                console.warn(`Producto con ID ${productId} no encontrado.`);
                                continue;
                            }
                            if (product.cantidad < quantityPurchased) {
                                console.warn(`Stock insuficiente para el producto ${productId}. Stock actual: ${product.cantidad}, solicitado: ${quantityPurchased}`);
                                continue;
                            }
                            const updatedQuantity = product.cantidad - quantityPurchased;
                            yield productsModel_1.productModel.findByIdAndUpdate(productId, { cantidad: updatedQuantity });
                            console.log(`Producto ${productId} actualizado. Stock restante: ${updatedQuantity}`);
                        }
                    }
                }
                res.status(200).send("Notificación procesada correctamente");
            }
            catch (error) {
                console.error("Error procesando la notificación:", error);
                res.status(500).send("Error procesando la notificación");
            }
        });
    }
}
exports.CartController = CartController;
