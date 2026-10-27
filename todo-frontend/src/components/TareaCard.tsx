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

            {/* parte superior - checkbox, título y botones con soporte responsivo */}
            <div className='flex items-start justify-between gap-3 mb-3'>

                {/* checkbox + título con flex-1 y min-w-0 para evitar desborde */}
                <div className='flex items-start gap-3 min-w-0 flex-1'>

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

                    {/* título - tachado si está completada con ajuste para palabras largas */}
                    <p className={`font-semibold text-sm leading-snug break-words
                        ${tarea.completada ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {tarea.titulo}
                    </p>

                </div>

                {/* botones editar y eliminar con área táctil cómoda para móvil */}
                <div className='flex items-center gap-1 shrink-0'>

                    {/* botón editar - abre el modal con los datos de la tarea */}
                    <button
                        onClick={() => onEditar(tarea)}
                        className='p-1.5 rounded-lg text-gray-400 hover:text-[#6C4DF6] hover:bg-purple-50 transition-colors'
                        aria-label='Editar tarea'
                    >
                        <Pencil className='w-4 h-4' />
                    </button>

                    {/* botón eliminar - elimina la tarea */}
                    <button
                        onClick={() => onEliminar(tarea.id)}
                        className='p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors'
                        aria-label='Eliminar tarea'
                    >
                        <Trash2 className='w-4 h-4' />
                    </button>

                </div>
            </div>

            {/* descripción de la tarea con salto de palabras */}
            {tarea.descripcion && (
                <p className='text-xs text-gray-500 mb-4 leading-relaxed break-words'>
                    {tarea.descripcion}
                </p>
            )}

            {/* badge de estado */}
            <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium
                ${tarea.completada
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'}`}>
                {tarea.completada ? 'Completada' : 'Pendiente'}
            </span>

        </div>
    );
};

export default TareaCard;