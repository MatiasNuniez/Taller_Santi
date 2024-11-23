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




    public async editProvider(req: Request, res: Response) {

        const { idProvider, data } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!idProvider || !data) {
                return res.status(400).json({ message: 'Faltan datos' });
            }

            if ((user) && (user.state === true)) {
                try {

                    const updatedProvider = await providerModel.findByIdAndUpdate(
                        idProvider,
                        data,
                        { new: true }
                    );


                    if (!updatedProvider) {
                        return res.status(404).json({ message: 'Proveedor no encontrado' });
                    }


                    return res.status(200).json(updatedProvider);
                } catch (error) {

                    return res.status(500).json({ message: 'Error interno del servidor', error });
                }
            }

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }

    public async deleteProvider(req: Request, res: Response) {

        const { providerId } = req.params
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!providerId) {
                return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' })
            }

            if (user && user.rol === 'admin' && user.state === true) {
                try {
                   
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