import { Response, Request } from "express";
import { userModel } from "../models/usersModel";
import { providerModel } from "../models/providersModel";
import { ProvidersInterface } from "../interfaces/providersInterface";


export class ProviderController {

    // Agregar proveedores
    public async addProvider(req: Request, res: Response) {
        const { data, userDNI } = req.body
        const user = await userModel.findOne({ DNI: userDNI })
        if ((user) && (user.rol === 'admin') && (user.state === true)) {
            const provider = await providerModel.findOne({ cuit: data.cuit })
            if (provider) {
                return res.status(400).json({ error: 'Ya existe el proveedor' })
            }
            try {
                const newProvider: ProvidersInterface = {
                    nombre: data.nombre,
                    apellido: data.apellido,
                    email: data.email,
                    direccion: data.direccion,
                    telefono: data.telefono,
                    cuit: data.cuit
                }
                const addNewProvider = await providerModel.create(newProvider)
                return res.status(200).json(addNewProvider)
            } catch (error) {
                return res.status(500).json({ error: 'Error al consultar la base de datos' })
            }
        }
        return res.status(401).json({ error: 'No eres administrador' })
    }


    // Editar proveedores
    public async editProvider(req: Request, res: Response) {
        // Obtenemos el id del proveedor y los datos a editar
        const { idProvider, data, userDNI } = req.body;

        // Verificamos que los datos y el ID del proveedor existan
        if (!idProvider || !data) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        const user = await userModel.findOne({ DNI: userDNI })
        if ((user) && (user.rol === 'admin') && (user.state === true)) {
            try {
                // Actualizamos el proveedor utilizando findByIdAndUpdate
                const updatedProvider = await providerModel.findByIdAndUpdate(
                    idProvider,
                    data,
                    { new: true } //Devuelve el documento actualizado
                );

                // Si no existe el proveedor devolvemos un 404
                if (!updatedProvider) {
                    return res.status(404).json({ message: 'Proveedor no encontrado' });
                }

                // Devolvemos el proveedor actualizado
                return res.status(200).json(updatedProvider);
            } catch (error) {
                // Devolvemos un 500 si hay error con el servidor
                return res.status(500).json({ message: 'Error interno del servidor', error });
            }
        }
    }

    public async deleteProvider(req: Request, res: Response) {
        // Obtenemos los datos del front
        const { userDNI } = req.body
        const { providerId } = req.params

        // Verificamos que se pase el id
        if (!providerId) {
            return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' })
        }

        const user = await userModel.findOne({ DNI: userDNI })
        if ((user) && (user.rol === 'admin') && (user.state === true)) {
            try {
                // Buscamos el elemento a eliminar y verificamos que exista para poder eliminarlo
                const deletepProvider = await providerModel.findByIdAndUpdate(providerId)
                if (!deletepProvider) {
                    return res.status(404).json({ message: 'Error al eliminar proveedor' })
                }
            } catch (error) {
                return res.status(500).json({ message: 'Error interno del servidor' })
            }
        }
    }
}