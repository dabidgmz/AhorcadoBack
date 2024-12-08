import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Juego from 'App/Models/Juego';
import Database from '@ioc:Adonis/Lucid/Database';

export default class JuegosController {
  /**
   * Crear un nuevo juego
   */
  public async agregarJuego({ request, response }: HttpContextContract) {
    try {
      const { user_id } = request.body();
      const palabraRandom = await Database.from('palabras').orderByRaw('RAND()').first();
      if (!palabraRandom) {
        return response.status(404).json({
          message: 'No hay palabras disponibles para iniciar un juego.',
        });
      }

      const nuevoJuego = await Juego.create({
        user_id,
        score: 0,
        lives: 6,
        round_time: 0,
        state: 'en_progreso',
        intentos_maximos: 6,
        palabra_id: palabraRandom.id,
      });

      return response.status(201).json({
        message: 'Juego creado exitosamente',
        juego: nuevoJuego,
        palabra: palabraRandom.palabra, 
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Error al crear el juego',
        error: error.message,
      });
    }
  }


  public async obtenerJuego({ params, response }: HttpContextContract) {
    try {
      const { id } = params;

      const juego = await Juego.query()
      .where('id', id)
      .andWhere('state', 'en_progreso')
      .preload('palabra')
      .first();

      if (!juego) {
        return response.status(404).json({
          message: 'No se encontró un juego en progreso con el ID proporcionado.',
        });
      }

      return response.status(200).json({
        message: 'Juego encontrado',
        juego: {
          id: juego.id,
          user_id: juego.user_id,
          palabra: juego.palabra.palabra, // Devuelve la palabra solo para pruebas (quítala en producción)
          lives: juego.lives,
        },
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Error al obtener el estado del juego',
        error: error.message,
      });
    }
  }

  /**
   * Intentar adivinar la palabra
   */


  public async intentarAdivinar({ request, params, response }: HttpContextContract) {
    try {
      const { frase } = request.body();
      const { id } = params;

      const juego = await Juego.query().where('id', id).andWhere('state', 'en_progreso').preload('palabra').first();

      if (!juego) {
        return response.status(404).json({
          message: 'No se encontró un juego en progreso con el ID proporcionado.',
        });
      }

      if (juego.lives <= 0) {
        juego.state = 'completada';
        await juego.save();

        return response.status(200).json({
          message: 'El juego ha terminado. No tienes más vidas.',
          juego,
        });
      }

      if (juego.palabra.palabra === frase) {
        juego.state = 'completada';
        juego.score = 100; 
        await juego.save();

        return response.status(200).json({
          message: '¡Felicidades! Has adivinado la palabra.',
          juego,
        });
      } else {
        juego.lives -= 1;
        await juego.save();

        if (juego.lives <= 0) {
          juego.state = 'completada';
          await juego.save();

          return response.status(200).json({
            message: 'Has perdido. No tienes más vidas.',
            juego,
          });
        }

        return response.status(200).json({
          message: 'Palabra incorrecta. Intenta nuevamente.',
          juego,
        });
      }
    } catch (error) {
      return response.status(400).json({
        message: 'Error al intentar adivinar la palabra',
        error: error.message,
      });
    }
  }
  
  
  

  
}
