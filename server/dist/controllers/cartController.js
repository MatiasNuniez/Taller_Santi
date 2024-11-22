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
class CartController {
    constructor() {
        this.client = new mercadopago_1.MercadoPagoConfig({ accessToken: 'TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690' });
        this.preference = new mercadopago_1.Preference(this.client);
    }
    getDataPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        }
                    ],
                    back_urls: {
                        success: 'http://localhost:3001',
                        failure: '',
                        pending: ''
                    },
                    auto_return: 'approved',
                    binary_mode: true,
                    notification_url: 'https://cdb8-190-136-150-11.ngrok-free.app/api/paymentInfo'
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
                // Verifica el estado del pago
                if (paymentInfo && paymentInfo.type === "payment") {
                    const paymentId = paymentInfo.data.id;
                    // Consulta los detalles del pago a MercadoPago
                    const response = yield fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                        headers: {
                            Authorization: `Bearer TEST-903469415048232-111315-4ddab3feef798fb6dbfeadc87e4bf3e7-322177690`,
                        },
                    });
                    console.log(response);
                    if (!response.ok) {
                        throw new Error(`Error al consultar el pago: ${response.status} ${response.statusText}`);
                    }
                    const paymentDetails = yield response.json();
                    console.log("datos del pago", paymentDetails);
                    if (paymentDetails.status === "approved") {
                        const nuevaVenta = {
                            fecha: Date.now(),
                            idVenta: paymentDetails.id,
                            total: paymentDetails.additional_info.items[0].unit_price
                        };
                        const nuevaVentaInfo = yield ventaModel_1.ventaModel.create(nuevaVenta);
                        console.log(nuevaVentaInfo);
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
