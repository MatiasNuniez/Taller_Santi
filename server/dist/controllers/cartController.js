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
class CartController {
    constructor() {
        this.client = new mercadopago_1.MercadoPagoConfig({ accessToken: 'TEST-2409603459267036-111117-f7acf48a313fb707c09ac79e5aba097c-322177690' });
        this.preference = new mercadopago_1.Preference(this.client);
    }
    getDataPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount, description, id } = req.body;
            console.log('Amount:', amount, 'Description:', description);
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
                    binary_mode: true
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
}
exports.CartController = CartController;
