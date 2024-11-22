import { Request, Response } from "express";
import { userModel } from "../models/usersModel";
import { categoryModel } from "../models/categoryModels";
import { categoryInterface } from "../interfaces/categoryInterface";
import jsonwebtoken from "jsonwebtoken";
import { SECRETKEY } from "../config/config";

export class CategoryController {

    public async getAllCategories(req: Request, res: Response) {

        console.log("Hola");
        

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!user) {
                return res.status(400).json({ message: 'El usuario no existe' });
            }

            if (user.rol === 'admin' && user.state) {
                try {
                    const allCategories = await categoryModel.find({});
                    return res.status(200).send(allCategories);
                } catch (error) {
                    return res.status(500).json({ message: 'Error al consultar a la base de datos' });
                }
            } else {
                return res.status(401).json({ message: 'No posee los permisos necesarios o no está activo' });
            }
        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }

    public async addCategory(req: Request, res: Response) {
        const { nombre, marca, urlImg } = req.body
        const existCategory = await categoryModel.findOne({ nombre: nombre })
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!user) {
                return res.status(400).json({ msj: 'El usuario no existe' })
            }

            if (existCategory) {
                return res.status(400).json({ msj: 'La categoria ya existe' })
            }

            if (user.rol === 'admin' && user.state) {
                try {
                    const newCategory: categoryInterface = {
                        nombre: nombre,
                        marca: marca,
                        urlImg: urlImg
                    }
                    console.log(newCategory);

                    const addNewCategory = await categoryModel.create(newCategory)
                    res.status(200).json({ Nueva_categoria: addNewCategory })
                } catch (error) {
                    res.status(404).json({ msj: 'Error al crear nueva categoria' })
                }
            } else {
                res.status(401).json({ msj: 'No posee los permisos necesarios' })
            }

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }

    public async editCategory(req: Request, res: Response) {
        const { data, idCategory } = req.body
        const category = await categoryModel.findOne({ _id: idCategory })
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!user) {
                return res.status(400).json({ msj: 'No existe el usuario' })
            }

            if (!category) {
                return res.status(400).json({ msj: 'La categoria no existe' })
            }

            if ((user.rol === 'admin') && (user.state)) {
                try {
                    const updateCategory = await categoryModel.findByIdAndUpdate(idCategory, data, { new: true })
                    if (!updateCategory) {
                        return res.status(404).json({ msj: 'Error al actualizar la categoria' })
                    }
                    return res.status(201).json(updateCategory)
                } catch (error) {
                    return res.status(404).json({ msj: 'Error al actualizar categoria en la base de datos' })
                }
            } else {
                res.status(401).json({ msj: 'No posee los permisos necesarios' })
            }

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }

    public async deleteCategory(req: Request, res: Response) {
        const { categoryId } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token){
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!categoryId) {
                return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
            }
    
            if (user && user.rol === 'admin' && user.state === true) {
                try {
                    const deleteProduct = await categoryModel.findByIdAndDelete(categoryId);
    
                    if (!deleteProduct) {
                        return res.status(404).json({ message: 'Categoria no encontrado' });
                    }
    
                    return res.status(200).json({ message: 'Categoria eliminada correctamente' });
                } catch (error) {
                    return res.status(500).json({ message: 'Error interno del servidor', error });
                }
            } else {
                return res.status(401).json({ message: 'No posee los permisos necesarios' });
            }
            
        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }
}