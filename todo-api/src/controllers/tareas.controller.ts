import type { Request, Response } from 'express';
import type { CrearTareaDto } from '../dtos/crear-tarea.dto.js';
import type { ActualizarTareaDto } from '../dtos/actualizar-tarea.dto.js';
import * as tareasService from '../services/tareas.service.js';

//funcion controladora
//Obtener todas las tareas
export const obtenerTareas = async (req: Request, res: Response) => {
  try{
  const tareas = await tareasService.obtenerTareas();
   res.status(200).json({success : true, data: tareas})

  }catch(error){
    res.status(500).json({message: 'Error al obtener las tareas', error});
  }
  
};



// Obtener las tareas segun su ID
export const obtenerTareaPorId = async (req:Request, res:Response) =>{
 try {
    const id = req.params.id as string; 

    if (!id){
      res.status(400).json({message: 'ID de tarea no proporcionado'});
      return;
    }
    const tareaResultado = await tareasService.obtenerTareaPorId(id);

    if (!tareaResultado) {
         res.status(404).json({message: 'Tarea No encontrada'});
         return;
    }
    res.status(200).json({success:true, data:tareaResultado});

    } catch (error) {
        res.status(500).json({message: 'Error al obtener la Tarea', error});
    }
};



// Crear una nueva Tarea
export const crearTarea = async (req:Request, res: Response) =>{
  try {
    const {titulo,descripcion} = req.body as CrearTareaDto;

    if(!titulo || !descripcion) {
      res.status(400).json({message: 'faltan datos obligatorios'});
      return;
    }

    const nuevaTarea = await tareasService.crearTarea({titulo,descripcion})
    res.status(201).json({success:true, data:nuevaTarea});

  }catch (error) {
    res.status(500).json({message: 'Error al crear la Tarea', error});
  }
  
}



// modificar una Tarea

export const actualizarTarea = async (req:Request, res:Response) => {
  try{
    const id = req.params.id as string;
    const {titulo,descripcion,completada} = req.body as ActualizarTareaDto;

    const tareaBusqueda = await tareasService.actualizarTarea(id, {titulo,descripcion,completada});

    if(!tareaBusqueda){
      res.status(404).json({message: 'Tarea no encontrada'});
      return;
    }
    res.status(200).json({success:true, data:tareaBusqueda});
    
    }catch(error){
    res.status(500).json({message: 'error al actualizar la tarea', error});

  }
};



// Eliminar una Tarea
export const eliminarTarea = async (req:Request, res:Response) => {
  try{
    const id = req.params.id as string;

    const tareaEliminar = await tareasService.eliminarTarea(id);

    res.status(200).json({success:true, message:'Tarea Eliminada correctamente'});

  }catch(error){
    res.status(500).json({message: 'error al eliminar la tarea', error});
  }
};
