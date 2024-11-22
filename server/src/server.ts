import express from 'express'
import { DataBase } from './db'
import { LoginRouter } from './routes/loginRouter'
import { RegisterRouter } from './routes/registerRouter'
import { ProviderRouter} from './routes/providerRouter'
import { ProductRouter } from './routes/productRouter'
import cors from 'cors'
import { CategoryRouter } from './routes/categoryRouter'
import { VentasRouter } from './routes/ventasRouter'
import { CartRouter } from './routes/cartRouter'


class Server extends DataBase {
    public app: express.Application = express()

    constructor() {
        super()
        this.listen()
        this.app.use(express.json())
        this.config()
        this.connect()
        this.app.use('/api', this.routes())
    }

    public config() {
        this.app.use(cors({
            origin: '*', // Cambia al dominio de tu cliente
            methods: 'GET,POST,PUT,PATCH,DELETE',   // Cambiar '*' a una URL específica si necesitas habilitar credenciales
        }))
        // Asegúrate de que express pueda parsear JSON
        this.app.use(express.json())
    }

    public listen() {
        this.app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
        })
    }

    routes():Array<express.Router>{
        return [new LoginRouter().router, new RegisterRouter().router, new ProductRouter().router, new ProviderRouter().router, new CategoryRouter().router, new VentasRouter().router, new CartRouter().router]
    }

}

new Server()