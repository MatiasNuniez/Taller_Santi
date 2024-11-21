import { Request, Response } from "express"
import { MercadoPagoConfig, Preference } from "mercadopago"

export class CartController {
    private client: MercadoPagoConfig;
    private preference: Preference

    constructor() {
        this.client = new MercadoPagoConfig({ accessToken: 'TEST-2409603459267036-111117-f7acf48a313fb707c09ac79e5aba097c-322177690' });
        this.preference = new Preference(this.client);
    }

    public async getDataPayment(req: Request, res: Response): Promise<void> {
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
                        id:id,
                        title: "Total de carrito",
                        unit_price: amount,
                        quantity: 1,
                        description:description,
                        currency_id: 'ARS'
                    }],
                back_urls: {
                    success: 'http://localhost:3001',
                    failure: '',
                    pending: ''
                },
                auto_return: 'approved',
                binary_mode: true
            }
            const result = await this.preference.create({ body });            
            if (result){
                res.status(200).json(result.init_point);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al procesar el pago' });
        }
    }
}