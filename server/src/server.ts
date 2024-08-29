import express from 'express'
import { DataBase } from './db'
import { LoginRouter } from './routes/loginRouter'
import { RegisterRouter } from './routes/registerRouter'

class Server extends DataBase {
    public app: express.Application = express()

    constructor() {
        super()
        this.listen()
        this.app.use(express.json())
        this.connect()
        this.app.use('/api', this.routes())

    }

    public listen() {
        this.app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
        })
    }

    routes():Array<express.Router>{
        return [new LoginRouter().router, new RegisterRouter().router ]
    }

}

new Server()