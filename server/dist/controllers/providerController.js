"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const usersModel_1 = require("../models/usersModel");
const providersModel_1 = require("../models/providersModel");
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ProviderController {
    getAllProviders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!user) {
                    throw new Error('No existe el usuario');
                }
                const providers = yield providersModel_1.providerModel.find({});
                return res.status(200).json(providers);
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    // Agregar proveedores
    addProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { provider } = req.body;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                if (!user) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                const providerBack = yield providersModel_1.providerModel.findOne({ cuit: provider.cuit });
                if (providerBack) {
                    return res.status(400).json({ error: 'Ya existe el proveedor' });
                }
                if (user.state) {
                    try {
                        const newProvider = {
                            nombre: provider.nombre,
                            apellido: provider.apellido,
                            email: provider.email,
                            direccion: provider.direccion,
                            telefono: provider.telefono,
                            cuit: provider.cuit
                        };
                        const addNewProvider = yield providersModel_1.providerModel.create(newProvider);
                        const { nombre, apellido, email, direccion, telefono, cuit } = addNewProvider;
                        return res.status(200).json({ nombre, apellido, email, direccion, telefono, cuit });
                    }
                    catch (error) {
                        return res.status(500).json({ error: 'Error al crear nuevo proveedor' });
                    }
                }
                else {
                    return res.status(401).json({ error: 'No eres administrador o el usuario no está activo' });
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    // Editar proveedores
    editProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtenemos el id del proveedor y los datos a editar
            const { idProvider, data } = req.body;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                // Verificamos que los datos y el ID del proveedor existan
                if (!idProvider || !data) {
                    return res.status(400).json({ message: 'Faltan datos' });
                }
                if ((user) && (user.state === true)) {
                    try {
                        // Actualizamos el proveedor utilizando findByIdAndUpdate
                        const updatedProvider = yield providersModel_1.providerModel.findByIdAndUpdate(idProvider, data, { new: true } //Devuelve el documento actualizado
                        );
                        // Si no existe el proveedor devolvemos un 404
                        if (!updatedProvider) {
                            return res.status(404).json({ message: 'Proveedor no encontrado' });
                        }
                        // Devolvemos el proveedor actualizado
                        return res.status(200).json(updatedProvider);
                    }
                    catch (error) {
                        // Devolvemos un 500 si hay error con el servidor
                        return res.status(500).json({ message: 'Error interno del servidor', error });
                    }
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
    deleteProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtenemos los datos del front
            const { providerId } = req.params;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token no proporcionado' });
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRETKEY || '');
                const user = yield usersModel_1.userModel.findById(decoded.id);
                // Verificamos que se pase el id
                if (!providerId) {
                    return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
                }
                if (user && user.rol === 'admin' && user.state === true) {
                    try {
                        // Buscamos el elemento a eliminar y verificamos que exista para poder eliminarlo
                        const deletepProvider = yield providersModel_1.providerModel.findByIdAndDelete(providerId);
                        if (!deletepProvider) {
                            return res.status(404).json({ message: 'Error al eliminar proveedor' });
                        }
                        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
                    }
                    catch (error) {
                        return res.status(500).json({ message: 'Error interno del servidor' });
                    }
                }
            }
            catch (error) {
                return res.status(403).json({ message: 'Token inválido o expirado', error });
            }
        });
    }
}
exports.ProviderController = ProviderController;
