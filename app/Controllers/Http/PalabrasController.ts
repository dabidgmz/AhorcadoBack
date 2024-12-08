import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Palabra from 'App/Models/Palabra';
import Database from '@ioc:Adonis/Lucid/Database'
export default class PalabrasController {

  public async addPalabra({ request, response }: HttpContextContract) {
    try {
      const data = await request.body();
      const { palabra, descripcion, categoria_id } = data;
      const newpalabra = await Palabra.create({
        palabra,
        descripcion,
        categoriaId: categoria_id,
      });

      return response.status(201).json({
        message: 'Palabra creada exitosamente',
        newpalabra,
      });

    } catch (error) {
      if (error.messages) {
        return response.status(400).json({
          message: 'Error en la validación de datos.',
          errors: error.messages,
        });
      }

      // Si es otro tipo de error
      return response.status(400).json({
        message: 'Error al crear palabra',
        error: error.message,
      });
    }
  }

 
  public async getPalabras({ response }: HttpContextContract) {
    try {
      const palabras = await Database
        .from('palabras')
        .join('categorias', 'categorias.id', '=', 'palabras.categoria_id') 
        .select('palabras.id', 'palabras.palabra', 'palabras.descripcion', 'palabras.categoria_id', 'categorias.name as categoria_nombre')

      return response.status(200).json({
        message: 'Palabras obtenidas exitosamente',
        palabras,
      })
    } catch (error) {
      return response.status(400).json({
        message: 'Error al obtener palabras',
        error: error.message,
      })
    }
  }

  public async getRandomPalabra({ response }: HttpContextContract) {
    try {
      const totalPalabras = await Database.from('palabras').count('* as total');
      const total = totalPalabras[0].total;
  
      if (total === 0) {
        return response.status(404).json({
          message: 'No se encontraron palabras en la base de datos',
        });
      }
  
      const randomOffset = Math.floor(Math.random() * total);
  
      const randomPalabra = await Database
        .from('palabras')
        .join('categorias', 'categorias.id', '=', 'palabras.categoria_id')
        .select(
          'palabras.id',
          'palabras.palabra',
          'palabras.descripcion',
          'palabras.categoria_id',
          'categorias.name as categoria_nombre'
        )
        .offset(randomOffset) 
        .limit(1);
  
      if (randomPalabra.length === 0) {
        return response.status(404).json({
          message: 'No se encontraron palabras en la base de datos',
        });
      }
  
      return response.status(200).json({
        message: 'Palabra obtenida exitosamente',
        palabra: randomPalabra[0],
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Error al obtener una palabra aleatoria',
        error: error.message,
      });
    }
  }
  
}
