import type { Request,Response,NextFunction } from "express";
import  jwt  from "jsonwebtoken"
import { envs } from "../config/envs.js";


export const authMiddleware = async (req:Request,res:Response,next:NextFunction) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({success:false,message: 'No autorizado - token requerido'});
            return;
        }

       const token = authHeader.split(' ')[1] as string;

       const decodificar = jwt.verify(token, envs.JWT_SECRET as string) as { id: string, email: string };
       req.headers['user-id'] = decodificar.id;
       next();

    }catch(error){
        next(error);
    }
};