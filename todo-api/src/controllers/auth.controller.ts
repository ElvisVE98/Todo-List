import type { Request,Response  } from "express";
import * as authServices from '../services/auth.service.js'
import type { RegistroDto } from "../dtos/registro-usuario.dto.js";
import type { LoginDto } from "../dtos/login-usuario.dto.js";



export const registro = async (req:Request,res:Response) => {
    try{
        const registrarUsuario = await authServices.registro(req.body as RegistroDto)
        res.status(201).json({success:true, data:registrarUsuario})

    }catch(error){
        res.status(500).json({message: ' Error al registrarse'})
    }
}



export const login = async (req:Request,res:Response) => {
    try{
        const token = await authServices.login(req.body as LoginDto)
        res.status(200).json({success:true,data:token})

    }catch(error){
        res.status(500).json({ success: false, message: 'Error al iniciar sesión', error });
    }
}

