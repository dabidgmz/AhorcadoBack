import Route from '@ioc:Adonis/Core/Route';

export default () => {
    Route.group(() => {
        // Juegos routes
        Route.post('/juegos', 'JuegosController.agregarJuego')
        //games/juegos_status/id_juego
        Route.get('/juego_status/:id', 'JuegosController.obtenerJuego')

        //games/juegos/id_juego/intentar
        Route.post('/juegos/:id/intentar', 'JuegosController.intentarAdivinar')

    }).prefix('games/')
}