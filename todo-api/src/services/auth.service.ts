import bcrypt from 'bcryptjs'; /// para encriptar las contraseñas
import {prisma} from '../config/prisma.js'; //llamar a la base de datos
import type { RegistroDto } from "../dtos/registro-usuario.dto.js";
import type { LoginDto } from '../dtos/login-usuario.dto.js';
import  jwt  from 'jsonwebtoken'; //generar el Token para el usuario
import { envs } from '../config/envs.js';




// Funcion para Crear usuario con contraseña encriptada
export const registro = async (usuario : RegistroDto) => {
    try{
        const passwordEncriptada = await bcrypt.hash(usuario.password,10)
       
        const nuevoUsuario = await prisma.usuario.create({
            data:{
            email: usuario.email,
            nombre: usuario.nombre_completo,
            password: passwordEncriptada
            }
         });
         const {password,...usuarioSinPassword} = nuevoUsuario
       return usuarioSinPassword
    }catch(error){
        console.error('ERROR ORIGINAL PRISMA:', JSON.stringify(error));
        throw Error;
    }
}


// Funcion para dar acceso al usuario
export const login = async (usuario: LoginDto) => {
    try {
        const busquedaUsuario = await prisma.usuario.findUnique({where : {email: usuario.email}})

        if(!busquedaUsuario){
            throw new Error('Email no existe');
        }

        const resultado = await bcrypt.compare(usuario.password,busquedaUsuario.password)

        if(!resultado) {
            throw new Error ('Contraseña incorrecta')
        }
       
        const token = jwt.sign({id: busquedaUsuario.id, email: busquedaUsuario.email}, envs.JWT_SECRET, {expiresIn:'6h'});
        return token;

    }catch (error){
        console.error('ERROR ORIGINAL LOGIN:', JSON.stringify(error));
        throw error;
    }
}
