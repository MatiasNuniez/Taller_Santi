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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderController = void 0;
const usersModel_1 = require("../models/usersModel");
const providersModel_1 = require("../models/providersModel");
class ProviderController {
    // Agregar proveedores
    addProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { provider, userDNI } = req.body;
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            if ((user.rol === 'admin') && (user.state === true)) {
                const providerBack = yield providersModel_1.providerModel.findOne({ cuit: provider.cuit });
                if (providerBack) {
                    return res.status(400).json({ error: 'Ya existe el proveedor' });
                }
                else {
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
                        return res.status(200).json(addNewProvider);
                    }
                    catch (error) {
                        return res.status(500).json({ error: 'Error al consultar la base de datos' });
                    }
                }
            }
            return res.status(401).json({ error: 'No eres administrador' });
        });
    }
    // Editar proveedores
    editProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtenemos el id del proveedor y los datos a editar
            const { idProvider, data, userDNI } = req.body;
            // Verificamos que los datos y el ID del proveedor existan
            if (!idProvider || !data) {
                return res.status(400).json({ message: 'Faltan datos' });
            }
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if ((user) && (user.rol === 'admin') && (user.state === true)) {
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
        });
    }
    deleteProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obtenemos los datos del front
            const { userDNI } = req.body;
            const { providerId } = req.params;
            // Verificamos que se pase el id
            if (!providerId) {
                return res.status(400).json({ message: 'Falta el id del elemento que se quiere eliminar' });
            }
            const user = yield usersModel_1.userModel.findOne({ DNI: userDNI });
            if ((user) && (user.rol === 'admin') && (user.state === true)) {
                try {
                    // Buscamos el elemento a eliminar y verificamos que exista para poder eliminarlo
                    const deletepProvider = yield providersModel_1.providerModel.findByIdAndUpdate(providerId);
                    if (!deletepProvider) {
                        return res.status(404).json({ message: 'Error al eliminar proveedor' });
                    }
                }
                catch (error) {
                    return res.status(500).json({ message: 'Error interno del servidor' });
                }
            }
        });
    }
}
exports.ProviderController = ProviderController;
