/*carpeta TEMPORAL que simula una BD con arrays, desaparece cuando conectamos una BD real*/ 
import type {Tarea} from '../interfaces/tarea.interfaces.js';

export const tareasArray: Tarea[] = [
    {
        id: '1',
        titulo: 'Tarea 1',
        descripcion: 'Descripcion de la tarea 1',
        completada: false,
    },
    {
        id: '2',
        titulo: 'Tarea 2',
        descripcion: 'Descripcion de la tarea 2',
        completada: true,
    },
    {
        id: '3',
        titulo: 'Tarea 3',
        descripcion: 'Descripcion de la tarea 3',
        completada: true,
    },
];