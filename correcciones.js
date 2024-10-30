import jwt from 'jsonwebtoken';

// Función para generar el token
const generateToken = (user) => {
    const payload = {
        id: user._id, // ID del usuario
        rol: user.rol, // Rol del usuario
    };

    return jwt.sign(payload, 'tu_clave_secreta', { expiresIn: '1h' }); // Cambia 'tu_clave_secreta' por tu clave real
};




import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userModel from './models/userModel'; // Ajusta la ruta según tu estructura
import categoryModel from './models/categoryModel'; // Ajusta según tu estructura

public async getAllCategories(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msj: 'Token no proporcionado' });
    }

    try {
        // Verificar y decodificar el token
        const decoded: any = jwt.verify(token, 'tu_clave_secreta');
        const user = await userModel.findById(decoded.id); // Obtener el usuario por su ID

        // Verificar rol y estado del usuario
        if (user && user.rol === 'admin' && user.state) {
            const allCategories = await categoryModel.find({});
            return res.status(200).send(allCategories);
        } else {
            return res.status(401).json({ msj: 'No posee los permisos necesarios o no está activo' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msj: 'Error al consultar a la base de datos o token inválido' });
    }
}
