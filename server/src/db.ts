import mongoose from "mongoose";

export class DataBase {

    constructor() {
        this.connect()
    }

    public connect() {
        try {
            mongoose.connect('mongodb://localhost:27017/taller');
            console.log('Conectado a la base de datos');

        } catch (error) {
            console.log('Error al conectar a la base de datos');

        }
    }
}