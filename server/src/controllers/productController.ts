import { productInterface } from "../interfaces/productInterface"
import { userModel } from "../models/usersModel"
import { Request, Response } from "express"
import { productModel } from "../models/productsModel"



export class ProductController {

    // Agregamos un nuevo producto
    public async addProduct(req: Request, res: Response) {
        const { data, userDNI } = req.body;
        const user = await userModel.findOne({ DNI: userDNI });
        
        if (user && user.rol === 'admin' && user.state === true) {
            try {

                const newProduct: productInterface = {
                    nombre: data.nombre,
                    costo: data.costo,
                    descripcion: data.descripcion,
                    precio_u: data.precio_u,
                    idProvider:data.idProvider
                };
                const addNewProduct = await productModel.create(newProduct);
                return res.status(200).json(addNewProduct);
            } catch (error) {
                return res.status(500).json({ error: 'Error al consultar la base de datos' });
            }
        }
        return res.status(401).json({ error: 'No posee los permisos necesarios' });
    }

    // Editar productos
    public async editProduct(req: Request, res: Response) {
        const { idProduct, data, userDNI } = req.body;

        if (!idProduct || !data) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        const user = await userModel.findOne({ DNI: userDNI });
        if (user && user.rol === 'admin' && user.state === true) {
            try {
                const updatedProduct = await productModel.findByIdAndUpdate(
                    idProduct,
                    data,
                    { new: true }
                );

                if (!updatedProduct) {
                    return res.status(404).json({ message: 'Producto no encontrado' });
                }

                return res.status(200).json(updatedProduct);
            } catch (error) {
                return res.status(500).json({ message: 'Error interno del servidor', error });
            }
        } else {
            return res.status(401).json({ message: 'No posee los permisos necesarios' });
        }
    }

    // Eliminar producto
    public async deleteProduct(req: Request, res: Response) {
        const { userDNI } = req.body;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
        }

        const user = await userModel.findOne({ DNI: userDNI });
        if (user && user.rol === 'admin' && user.state === true) {
            try {
                const deleteProduct = await productModel.findByIdAndDelete(productId);

                if (!deleteProduct) {
                    return res.status(404).json({ message: 'Producto no encontrado' });
                }

                return res.status(200).json({ message: 'Producto eliminado correctamente' });
            } catch (error) {
                return res.status(500).json({ message: 'Error interno del servidor', error });
            }
        } else {
            return res.status(401).json({ message: 'No posee los permisos necesarios' });
        }
    }
}
