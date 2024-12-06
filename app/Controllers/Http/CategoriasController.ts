import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import CategoriaCreateValidator from 'App/Validators/CategoriaCreateValidator';
export default class CategoriasController {

    public async addCategoria({ request, response }: HttpContextContract) {
        try {
            const data = await request.validate(CategoriaCreateValidator);
            const { name } = data;
            
            const categoria = await Categoria.create({
                name: name
            });
    
            return response.status(201).json({
                message: 'Categoría creada exitosamente',
                categoria,
            });
        } catch (error) {
            if (error.messages) {
                return response.status(400).json({
                    message: 'Error en la validación de datos.',
                    errors: error.messages,
                });
            }

            return response.status(400).json({
                message: 'Error al crear categoría',
                error: error.message,
            });
        }
    }
    

    public async getCategories({ response }: HttpContextContract) {
        try {
            const categorias = await Categoria.all();
            return response.status(200).json({
                message: 'Categorías obtenidas exitosamente',
                categorias,
            });
        } catch (error) {
            return response.status(400).json({
                message: 'Error al obtener categorías',
                error: error.message,
            });
        }
    }
    
}
