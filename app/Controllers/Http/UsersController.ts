import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import User from 'App/Models/User'
import Ws from 'App/Services/WebSocketService';
export default class UsersController {

    public async me({ auth, response }: HttpContextContract) {
        try {
            const user = await auth.authenticate();
    
            return response.status(200).json({
                name: user.name,
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            return response.status(401).json({
                message: 'No autorizado',
                error: error.message,
            });
        }
    }
    
    public async update({ auth, request, response }: HttpContextContract) {
        try {
            const user = await auth.authenticate();
            const data = request.only(['name', 'username', 'email']);
            user.merge(data);
            await user.save();
    
            Ws.io.emit('user_updated', user);
            return response.status(200).json({
                message: 'Usuario actualizado correctamente',
                user
            });
        } catch (error) {
            return response.status(400).json({
                message: 'Error al actualizar usuario',
                error: error.message,
            });
        }
    }
    



}
