import Route from '@ioc:Adonis/Core/Route';

export default () => {
    Route.group(() => {
        // Categorias routes
        Route.get('/getCategories', 'CategoriasController.getCategories')
        Route.post('/addCategoria', 'CategoriasController.addCategoria')
    }).prefix('categorias/')
}