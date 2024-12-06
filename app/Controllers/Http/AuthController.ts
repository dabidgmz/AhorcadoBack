import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Ws from 'App/Services/WebSocketService';
import Mail from '@ioc:Adonis/Addons/Mail'; 
import UserCreateValidator from 'App/Validators/UserCreateValidator';

export default class AuthController {

    public async login({ request, auth, response }: HttpContextContract) {
        try {
            const {email, password} = request.body();
            const token = await auth.use('api').attempt(email, password);
            return response.status(201).json({
                message: 'Usuario logueado exitosamente',
                token
            });
    
        } catch (error) {
            console.log(error);
    
            return response.status(400).json({
                message: 'Error al loguear usuario',
            });
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        try {
            await auth.use('api').logout();
    
            return response.status(200).json({
                message: 'Cierre de sesión exitoso, Bye Bye panzona...'
            });
        } catch (error) {
            return response.status(500).json({
                message: 'Error al cerrar sesión',
            });
        }
    }
    


    public async register({auth, request, response}: HttpContextContract) {
        try {
            const data = await request.validate(UserCreateValidator);
            const {name,username, email, password} = data;
            const existingUser = await User.findBy('email', email);
            if (existingUser) {
                return response.status(400).json({
                message: 'El correo electrónico ya está en uso.',
                });
            }
            const confirmationCode = Math.random().toString(36).substring(2, 7).toUpperCase();
            const user = await User.create({
                name,
                username,
                email,
                password,
                confirmation_code: confirmationCode,
                is_confirmed: false
            });
            await user.save();
             await Mail.send((message) => {
                message
                    .to(email)
                    .from("david.gmzherrera28@gmail.com")
                    .subject('Confirma tu correo')
                    .htmlView('confirmation', { name, confirmationCode }); 
            }); 
            const token = await auth.use('api').attempt(email, password);
            Ws.io.emit('new:user', user)
            return response.status(201).json({
                message: 'Usuario registrado exitosamente. Revisa tu correo para confirmarlo.',
                user,            
                token,
            });
    
        }catch (error) {
            if (error.messages) {
                return response.status(400).json({
                    message: 'Error en la validación de datos.',
                    errors: error.messages,
                });
            }
    
            console.error(error); 
            return response.status(500).json({
                message: 'Error interno del servidor.',
            });
        }
    }
    
    public async confirmEmail({ request, response }: HttpContextContract) {
        const code = request.input('code');
        if (!code) {
            return response.status(400).json({
                message: 'El código de confirmación es requerido',
            });
        }
    
        const user = await User.findBy('confirmation_code', code);
    
        if (!user) {
            return response.status(400).json({
                message: 'Código de confirmación inválido',
            });
        }
    
        user.is_confirmed = true;
        user.confirmation_code = null;
        await user.save();
    
        return response.status(200).json({
            message: 'Correo confirmado exitosamente',
        });
    }
}