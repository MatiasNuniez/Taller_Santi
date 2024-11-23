import { productInterface } from "../interfaces/productInterface"
import { userModel } from "../models/usersModel"
import { Request, Response } from "express"
import { productModel } from "../models/productsModel"
import { SECRETKEY } from "../config/config";
import jsonwebtoken from 'jsonwebtoken'

export class ProductController {


    public async getAllProducts(req: Request, res: Response) {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!user) {
                throw new Error('Usuario no encontrado')
            }

            if (user.state) {
                try {
                    const data = await productModel.find({})
                    res.status(200).json(data)

                } catch (error) {
                    throw new Error('Error al obtener los productos')
                }
            }

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }



    public async addProduct(req: Request, res: Response) {
        const { product } = req.body;
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

  
            if (user.state) {

                if (!product.nombre || !product.costo || !product.descripcion || !product.precio_u || !product.idProvider || !product.cantidad) {
                    return res.status(400).json({ error: 'Datos del producto incompletos o inválidos' });
                }


                const newProduct: productInterface = {
                    nombre: product.nombre,
                    costo: product.costo,
                    cantidad: product.cantidad,
                    descripcion: product.descripcion,
                    precio_u: product.precio_u,
                    idProvider: product.idProvider,
                    categoria: product.categoria,
                    img: product.urlImg,
                    marca: product.marca
                };


                const addNewProduct = await productModel.create(newProduct);


                return res.status(200).json(addNewProduct);
            }


            return res.status(401).json({ error: 'No posee los permisos necesarios' });

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }


    public async editProduct(req: Request, res: Response) {
        const { idProduct, data } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];


        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        if (!idProduct || !data) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (user && user.state === true) {
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

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }


    public async deleteProduct(req: Request, res: Response) {
        const { productId } = req.params;

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, SECRETKEY || '') as { id: string };
            const user = await userModel.findById(decoded.id);

            if (!productId) {
                return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
            }

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

        } catch (error) {
            return res.status(403).json({ message: 'Token inválido o expirado', error });
        }
    }
}
