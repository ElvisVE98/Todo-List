import {prisma} from '../config/prisma.js';
import  type {Tarea} from '../generated/prisma/client.js'
import type { ActualizarTareaDto } from '../dtos/actualizar-tarea.dto.js';
import type { CrearTareaDto } from '../dtos/crear-tarea.dto.js';


/// FUNCIONES PARA OBTER LAS TAREAS DESDE LA BASE DE DATOS
export const obtenerTareas = async (): Promise<Tarea[]> => {
    try {
        const tareas = await prisma.tarea.findMany();
        return tareas;
    } catch (error) {
        throw Error('Error al obtener las tareas');
    }
}

/// FUNCION PARA OBTENER UNA TAREA POR SU ID
export const obtenerTareaPorId = async (id: string): Promise<Tarea | null>=>{
    try{
        const tareaId = await prisma.tarea.findUnique({where: {id}});
        return tareaId;

    }catch(error){
        throw Error('Error al obtener la tarea por ID');
    }
}

/// FUNCION PARA CREAR UNA NUEVA TAREA
export const crearTarea = async (tarea : CrearTareaDto): Promise<Tarea> => {
    try{
        const nuevaTarea = await prisma.tarea.create({data: tarea});
        return nuevaTarea;

    }catch(error){
        throw Error('Error al crear la tarea');
    }
}


/// FUNCION PARA ACTUALIZAR UNA TAREA EXISTENTE
export const actualizarTarea = async (id:string, tarea : ActualizarTareaDto): Promise<Tarea> => {
    try{
        const tareaActualizada = await prisma.tarea.update({where : {id}, data : tarea});
        return tareaActualizada;
    }catch(error){
        throw Error('Error al actualizar la tarea');
    }    
}

/// FUNCION PARA ELIMINAR UNA TAREA EXISTENTE
export const eliminarTarea = async (id:string): Promise < Tarea> => {
    try{
        const tareaEliminada = await prisma.tarea.delete({where : {id}});
        return tareaEliminada;
    }catch(error){
        throw Error('Error al eliminar la tarea');
    }
}

