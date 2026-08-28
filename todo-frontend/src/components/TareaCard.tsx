import type { Tarea } from '../types/tarea.types';
import { Pencil, Trash2 } from 'lucide-react';

type Props = {
    tarea: Tarea;                    // los datos de la tarea
    onEditar: (tarea: Tarea) => void;  // recibe la tarea para saber cuál editar
    onEliminar: (id: string) => void;  // recibe el id para saber cuál eliminar
    onCompletar: (id: string, completada: boolean) => void; // id y nuevo estado
}

const TareaCard = ({ tarea, onEditar, onEliminar, onCompletar }: Props) => {

    return (
        // card principal - borde de color según estado
        // completada = verde, pendiente = amarillo
        <div className={`bg-white rounded-2xl p-5 shadow-sm border-2
            ${tarea.completada ? 'border-[#16C098]' : 'border-[#FFB020]'}`}>

            {/* parte superior - checkbox, título y botones */}
            <div className='flex items-start justify-between mb-3'>

                {/* checkbox + título */}
                <div className='flex items-start gap-3'>

                    {/* checkbox - cambia de color según estado */}
                    <div
                        onClick={() => onCompletar(tarea.id, !tarea.completada)}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer shrink-0 mt-0.5
                            ${tarea.completada
                                ? 'bg-[#16C098] border-[#16C098]'
                                : 'border-[#FFB020] bg-white'}`}
                    >
                        {/* checkmark visible solo si está completada */}
                        {tarea.completada && (
                            <span className='text-white text-xs font-bold'>✓</span>
                        )}
                    </div>

                    {/* título - tachado si está completada */}
                    <p className={`font-semibold text-sm leading-snug
                        ${tarea.completada ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {tarea.titulo}
                    </p>

                </div>

                {/* botones editar y eliminar */}
                <div className='flex items-center gap-2 shrink-0'>

                    {/* botón editar - abre el modal con los datos de la tarea */}
                    <button
                        onClick={() => onEditar(tarea)}
                        className='text-gray-400 hover:text-[#6C4DF6] transition-colors'
                    >
                        <Pencil className='w-4 h-4' />
                    </button>

                    {/* botón eliminar - elimina la tarea */}
                    <button
                        onClick={() => onEliminar(tarea.id)}
                        className='text-gray-400 hover:text-red-500 transition-colors'
                    >
                        <Trash2 className='w-4 h-4' />
                    </button>

                </div>
            </div>

            {/* descripción de la tarea */}
            {tarea.descripcion && (
                <p className='text-xs text-gray-500 mb-4 leading-relaxed'>
                    {tarea.descripcion}
                </p>
            )}

            {/* badge de estado */}
            <span className={`text-xs px-3 py-1 rounded-full font-medium
                ${tarea.completada
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'}`}>
                {tarea.completada ? 'Completada' : 'Pendiente'}
            </span>

        </div>
    );
};

export default TareaCard;