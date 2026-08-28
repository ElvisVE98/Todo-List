import type { Tarea } from "@/types/tarea.types";
import { useState,useEffect } from "react";


type Props = {
    estaAbierto:boolean;
    onCerrar:()=> void;
    onGuardar: (datos: { titulo: string; descripcion: string; completada: boolean }) => void;
    tarea?: Tarea
}

const ModalTarea = ({ estaAbierto, onCerrar, onGuardar, tarea }: Props) => {


 // estado de cada campo del formulario
const [titulo, setTitulo] = useState(tarea?.titulo ?? '');
const [descripcion, setDescripcion] = useState(tarea?.descripcion ?? '');
const [completada, setCompletada] = useState(tarea?.completada ?? false);


// cuando cambia la tarea (edición) actualiza los campos del formulario
useEffect(() => {
    setTitulo(tarea?.titulo ?? '');
    setDescripcion(tarea?.descripcion ?? '');
    setCompletada(tarea?.completada ?? false);
}, [tarea]);


// función que se ejecuta al hacer click en Guardar
// recoge los datos del formulario y los pasa al padre via onGuardar
const handleGuardar = () => {
    if (!titulo.trim()) return; // no guardar si el título está vacío
    onGuardar({ titulo, descripcion, completada });
    onCerrar(); // cierra el modal después de guardar
};

if (!estaAbierto) return null;

    return (
        // fondo oscuro que cubre toda la pantalla
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            
            {/* contenedor del modal */}
            <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'>
                
                <h2 className='font-bold text-lg mb-4'>
                    {tarea ? 'Editar tarea' : 'Nueva tarea'}
                </h2>


                {/* aquí irá el formulario */}

    {/* campo titulo */}
    <div className='flex flex-col gap-1 mb-4'>
    <label className='text-sm font-medium text-gray-700'>Título</label>
    <input
        type='text'
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder='Título de la tarea'
        className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'/>
    </div>

    {/* campo descripcion */}
    <div className='flex flex-col gap-1 mb-4'>
    <label className='text-sm font-medium text-gray-700'>Descripción</label>
    <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder='Descripción de la tarea'
        rows={3}
        className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6] resize-none'/>
    </div>

    {/* checkbox completada */}
    <div className='flex items-center gap-3 mb-6'>
    <input
        type='checkbox'
        id='completada'
        checked={completada}
        onChange={(e) => setCompletada(e.target.checked)}
        className='w-4 h-4 accent-[#6C4DF6]'/>
    <label htmlFor='completada' className='text-sm text-gray-700'>
        Marcar como completada
    </label>
    </div>

    {/* botones */}
    <div className='flex gap-3'>
    {/* cancelar */}
    <button
        onClick={onCerrar}
        className='flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors'>
        Cancelar
    </button>

    {/* guardar */}
    <button
        onClick={handleGuardar}
        className='flex-1 bg-[#6C4DF6] text-white font-medium py-3 rounded-xl hover:bg-[#5a3de0] transition-colors'>
        {tarea ? 'Guardar cambios' : 'Crear tarea'}
    </button>
    </div>

            </div>
        </div>
    );
};

export default ModalTarea;