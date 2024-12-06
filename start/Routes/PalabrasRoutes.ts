import Route from '@ioc:Adonis/Core/Route';

export default () => {
    Route.group(() => {
        Route.post('addPalabra', 'PalabrasController.addPalabra');
        Route.get('/palabras', 'PalabrasController.getPalabras');
    }).prefix('words/')
}