import { Response, Request } from "express";
import { userModel } from "../models/usersModel";
import { providerModel } from "../models/providersModel";
import { ProvidersInterface } from "../interfaces/providersInterface";


export class ProviderController {


    public async getAllProviders(req: Request, res: Response) {
        const { userDNI } = req.params;
        try {
            const user = await userModel.find({ DNI: userDNI })

            if (!user) {
                throw new Error('No existe el usuario')
            }
            const providers = await providerModel.find({})
            return res.status(200).json(providers)
        } catch (error) {

        }
    }

    // Agregar proveedores
    public async addProvider(req: Request, res: Response) {
        const { provider, userDNI } = req.body;

        try {
            const user = await userModel.findOne({ DNI: userDNI });
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            if (user.rol !== 'admin' || !user.state) {
                return res.status(401).json({ error: 'No eres administrador o el usuario no está activo' });
            }

            const providerBack = await providerModel.findOne({ cuit: provider.cuit });
            if (providerBack) {
                return res.status(400).json({ error: 'Ya existe el proveedor' });
            }

            const newProvider: ProvidersInterface = {
                nombre: provider.nombre,
                apellido: provider.apellido,
                email: provider.email,
                direccion: provider.direccion,
                telefono: provider.telefono,
                cuit: provider.cuit
            };

            const addNewProvider = await providerModel.create(newProvider);
            const { nombre, apellido, email, direccion, telefono, cuit } = addNewProvider;
            return res.status(200).json({ nombre, apellido, email, direccion, telefono, cuit });

        } catch (error) {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
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
        const { providerId, userDNI } = req.params        
        // Verificamos que se pase el id
        if (!providerId) {
            return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' })
        }

        const user = await userModel.findOne({ DNI: userDNI })
        if (user && user.rol === 'admin' && user.state === true) {            
            try {
                // Buscamos el elemento a eliminar y verificamos que exista para poder eliminarlo
                const deletepProvider = await providerModel.findByIdAndDelete(providerId)
                if (!deletepProvider) {
                    return res.status(404).json({ message: 'Error al eliminar proveedor' })
                }
                
                res.status(200).json({message:'Proveedor eliminado correctamente'})
                
            } catch (error) {
                return res.status(500).json({ message: 'Error interno del servidor' })
            }
        }
    }
}