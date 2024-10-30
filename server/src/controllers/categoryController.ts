import { Request, Response } from "express";
import { userModel } from "../models/usersModel";
import { categoryModel } from "../models/categoryModels";
import { categoryInterface } from "../interfaces/categoryInterface";
import jwt from "jsonwebtoken";

export class CategoryController {

    public async getAllCategories(req: Request, res: Response) {
        const {userDNI} = req.params
        
        const user = await userModel.findOne({DNI: userDNI })

        if (!user) {
            return res.status(400).json({ msj: 'El usuario no existe' })
        }

        if (user.rol === 'admin' && user.state) {
            try {
                const allCategories = await categoryModel.find({})
                return res.status(200).send(allCategories)
            } catch (error) {
                res.status(500).json({ msj: 'error al consultar a la base de datos' })
            }
        } else {
            res.status(401).json({ msj: 'No posee los permisos necesarios o no esta activo' })
        }
    }

    public async addCategory(req: Request, res: Response) {
        const { userDNI, nombre, marca, urlImg } = req.body
        const user = await userModel.findOne({ DNI: userDNI })
        const existCategory = await categoryModel.findOne({ nombre: nombre })


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
    }

    public async editCategory(req: Request, res: Response) {
        const { userDNI, data, idCategory } = req.body
        const user = await userModel.findOne({ DNI: userDNI })
        const category = await categoryModel.findOne({ _id: idCategory })

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
                    return res.status(404).json({msj:'Error al actualizar la categoria'})
                }
                return res.status(201).json(updateCategory)
            } catch (error) {
                return res.status(404).json({msj:'Error al actualizar categoria en la base de datos'})
            }
        } else {
            res.status(401).json({msj:'No posee los permisos necesarios'})
        }
    }

    public async deleteCategory(req:Request, res:Response){
        const { categoryId, userDNI } = req.params;

        if (!categoryId) {
            return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
        }

        const user = await userModel.findOne({ DNI: userDNI });
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
    }

}