import { productInterface } from "../interfaces/productInterface"
import { userModel } from "../models/usersModel"
import { Request, Response } from "express"
import { productModel } from "../models/productsModel"

export class ProductController {


    public async getAllProducts(req: Request, res: Response) {
        const { userDNI } = req.params
        const user = await userModel.findOne({ DNI: userDNI })

        if (!user) {
            throw new Error('Usuario no encontrado')
        }

        if (user.rol === 'admin' && user.state) {
            try {
                const data = await productModel.find({})
                res.status(200).json(data)

            } catch (error) {
                throw new Error('Error al obtener los productos')
            }
        }
    }


    // Agregamos un nuevo producto
    public async addProduct(req: Request, res: Response) {
        try {
            const { product, userDNI } = req.body;
            console.log(product);
            console.log(userDNI);

            // Buscar el usuario en la base de datos
            const user = await userModel.findOne({ DNI: userDNI });

            // Verificar si el usuario existe
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            // Verificar si el usuario tiene rol de admin y su estado es activo
            if (user.rol === 'admin' && user.state) {
                // Validar que los datos del producto sean correctos
                if (!product.nombre || !product.costo || !product.descripcion || !product.precio_u || !product.idProvider || !product.cantidad) {
                    return res.status(400).json({ error: 'Datos del producto incompletos o inválidos' });
                }

                // Crear el nuevo producto
                const newProduct: productInterface = {
                    nombre: product.nombre,
                    costo: product.costo,
                    cantidad:product.cantidad,
                    descripcion: product.descripcion,
                    precio_u: product.precio_u,
                    idProvider: product.idProvider,
                    categoria: product.categoria,
                    img: product.urlImg,
                    marca: product.marca
                };

                // Guardar el nuevo producto en la base de datos
                const addNewProduct = await productModel.create(newProduct);

                // Retornar el producto agregado como respuesta
                return res.status(200).json(addNewProduct);
            }

            // Si el usuario no tiene permisos
            return res.status(401).json({ error: 'No posee los permisos necesarios' });

        } catch (error) {
            // Manejar errores inesperados
            console.error('Error al agregar el producto:', error);
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
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
