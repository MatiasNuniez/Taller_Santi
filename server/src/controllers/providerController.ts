import { Response, Request } from "express";
import { userModel } from "../models/usersModel";
import { providerModel } from "../models/providersModel";
import { ProvidersInterface } from "../interfaces/providersInterface";
import { SECRETKEY } from "../config/config";
import jsonwebtoken from 'jsonwebtoken';

export class ProviderController {

    public async getAllProviders(req: Request, res: Response) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!user) {
                throw new Error('No existe el usuario')
            }
            const providers = await providerModel.find({})
            return res.status(200).json(providers)
        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }

    // Agregar proveedores
    public async addProvider(req: Request, res: Response) {
        const { provider } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const providerBack = await providerModel.findOne({ cuit: provider.cuit });
            if (providerBack) {
                return res.status(400).json({ error: 'Ya existe el proveedor' });
            }

            if (user.state) {
                try {
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
                    return res.status(500).json({ error: 'Error al crear nuevo proveedor' });
                }
            } else {
                return res.status(401).json({ error: 'No eres administrador o el usuario no está activo' });
            }
        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }



    // Editar proveedores
    public async editProvider(req: Request, res: Response) {
        // Obtenemos el id del proveedor y los datos a editar
        const { idProvider, data } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);
            // Verificamos que los datos y el ID del proveedor existan
            if (!idProvider || !data) {
                return res.status(400).json({ message: 'Faltan datos' });
            }

            if ((user) && (user.state === true)) {
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

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }

    public async deleteProvider(req: Request, res: Response) {
        // Obtenemos los datos del front
        const { providerId } = req.params
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);
            // Verificamos que se pase el id
            if (!providerId) {
                return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' })
            }

            if (user && user.rol === 'admin' && user.state === true) {
                try {
                    // Buscamos el elemento a eliminar y verificamos que exista para poder eliminarlo
                    const deletepProvider = await providerModel.findByIdAndDelete(providerId)
                    if (!deletepProvider) {
                        return res.status(404).json({ message: 'Error al eliminar proveedor' })
                    }

                    res.status(200).json({ message: 'Proveedor eliminado correctamente' })

                } catch (error) {
                    return res.status(500).json({ message: 'Error interno del servidor' })
                }
            }

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }
}