import Layout from "@/components/layout";
import ModalTarea from '../components/ModalTarea';
import { useState,useEffect } from 'react';
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } from '../api/tareas.api'
import type {Tarea} from '../types/tarea.types'
import TareaCard from '../components/TareaCard';
import EmptyPics from "../assets/undraw_to-do-list_o3jf.svg"


const Tareas = () => {

// controla si el modal está abierto o cerrado
const [modalAbierto, setModalAbierto] = useState(false);

// guarda todas las tareas que vienen del backend
const [tareas,setTareas] = useState<Tarea[]>([]);

// guarda la tarea que se está editando, null si es nueva
const [tareaEditando, setTareaEditando] = useState<Tarea | null>(null);

// controla el filtro activo: 'todas', 'completadas' o 'pendientes'
const [filtro, setFiltro] = useState<'todas' | 'completadas' | 'pendientes'>('todas');

// texto del buscador
const [busqueda, setBusqueda] = useState('');

// llama al backend y guarda las tareas en el estado
useEffect(() => {
    const cargarTareas = async() =>{
        const respuesta = await obtenerTareas();
        setTareas(respuesta.data ?? []);
    };
    cargarTareas();
},[]);


// recarga las tareas desde el backend
// se llama después de crear, editar o eliminar
const recargarTareas = async () => {
    const respuesta = await obtenerTareas();
    setTareas(respuesta.data ?? []);
};


// filtra las tareas según el filtro activo y el texto de búsqueda
const tareasFiltradas = tareas.filter((tarea) => {
    // filtra por estado
    const cumpleFiltro =
        filtro === 'todas' ? true :
        filtro === 'completadas' ? tarea.completada :
        !tarea.completada;

    // filtra por búsqueda - busca en el título
    const cumpleBusqueda = tarea.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
});



return (
    <Layout>

        {/* encabezado responsivo con título y botón nueva tarea adaptable */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
            <div>
                <h1 className='text-xl sm:text-2xl font-extrabold text-gray-800'>Mis Tareas</h1>
                {/* muestra total y pendientes */}
                <p className='text-gray-500 text-xs sm:text-sm mt-1'>
                    {tareas.length} tareas · {tareasFiltradas.filter(t => !t.completada).length} pendientes
                </p>
            </div>

            {/* botón nueva tarea - ancho completo en móvil y automático en desktop */}
            <button
                onClick={() => setModalAbierto(true)}
                className='bg-[#6C4DF6] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#5a3de0] transition-colors w-full sm:w-auto text-sm sm:text-base'>
                + Nueva tarea
            </button>
        </div>

        {/* barra de filtros y buscador - se apila en columna en pantallas móviles */}
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6'>

            {/* grupo de botones de filtro con scroll horizontal o distribución equitativa */}
            <div className='flex gap-1 border border-gray-200 rounded-xl bg-white p-1 overflow-x-auto shrink-0 justify-between sm:justify-start'>
                {/* botón Todas */}
                <button
                    onClick={() => setFiltro('todas')}
                    className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                        ${filtro === 'todas' ? 'bg-[#6C4DF6] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    Todas
                </button>

                {/* botón Completadas */}
                <button
                    onClick={() => setFiltro('completadas')}
                    className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                        ${filtro === 'completadas' ? 'bg-[#6C4DF6] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    Completadas
                </button>

                {/* botón Pendientes */}
                <button
                    onClick={() => setFiltro('pendientes')}
                    className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap
                        ${filtro === 'pendientes' ? 'bg-[#6C4DF6] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    Pendientes
                </button>
            </div>

            {/* buscador de tareas a ancho completo en móvil */}
            <input
                type='text'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder='Buscar tarea...'
                className='w-full sm:flex-1 border bg-white border-gray-200 rounded-xl px-4 py-2.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
            />
        </div>

        {/* modal - sirve para crear y editar */}
        <ModalTarea
            estaAbierto={modalAbierto}
            onCerrar={() => {
                setModalAbierto(false);
                setTareaEditando(null);
            }}
            tarea={tareaEditando ?? undefined}
            onGuardar={async (datos) => {
                if (tareaEditando) {
                    await actualizarTarea(tareaEditando.id, datos);
                } else {
                    await crearTarea(datos);
                }
                setModalAbierto(false);
                setTareaEditando(null);
                recargarTareas();
            }}
        />

        {/* estado vacío - cuando no hay tareas con imagen y texto adaptables */}
        {tareasFiltradas.length === 0 && (
            <div className='flex flex-col items-center justify-center py-12 sm:py-20 text-center px-4'>
                <img src={EmptyPics} alt="EmptyPics" className="w-full max-w-[220px] sm:max-w-xs mb-6"></img>
                <h3 className='font-bold text-gray-700 mb-2 text-xl sm:text-2xl'>
                    {busqueda ? 'No se encontraron tareas' : 'Aún no tienes tareas'}
                </h3>
                <p className='text-gray-400 text-xs sm:text-sm mb-6 max-w-sm'>
                    {busqueda ? 'Intenta con otro término de búsqueda' : 'Crea la primera y empieza a ver tu progreso'}
                </p>
                {!busqueda && (
                    <button
                        onClick={() => setModalAbierto(true)}
                        className='bg-[#6C4DF6] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#5a3de0] transition-colors text-sm sm:text-base'>
                        + ¡Crea la primera!
                    </button>
                )}
            </div>
        )}

        {/* grid de tareas filtradas con espaciado adaptable */}
        {tareasFiltradas.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                {tareasFiltradas.map((tarea) => (
                    <TareaCard
                        key={tarea.id}
                        tarea={tarea}
                        onEditar={(tarea) => {
                            setTareaEditando(tarea);
                            setModalAbierto(true);
                        }}
                        onEliminar={async (id) => {
                            await eliminarTarea(id);
                            recargarTareas();
                        }}
                        onCompletar={async (id, completada) => {
                            await actualizarTarea(id, {
                                ...tareas.find(t => t.id === id)!,
                                completada
                            });
                            recargarTareas();
                        }}
                    />
                ))}
            </div>
        )}

    </Layout>
);
}
export default Tareas;