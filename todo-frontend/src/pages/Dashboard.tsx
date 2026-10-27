import Layout from "@/components/layout";
import {obtenerTareas} from '../api/tareas.api'
import { useEffect,useState } from "react";
import type {Tarea} from '../types/tarea.types'
import {ListTodo,CheckCircle, Clock} from 'lucide-react'
import { Link } from "react-router-dom";
import ModalTarea from '../components/ModalTarea';
import { crearTarea } from '../api/tareas.api';

const Dashboard = () =>{
   
// controla si el modal está abierto o cerrado
const [modalAbierto, setModalAbierto] = useState(false);

// guarda todas las tareas que vienen del backend
const [tareas, setTareas] = useState<Tarea[]>([]);

// se ejecuta una sola vez cuando el Dashboard carga
// llama al backend y guarda las tareas en el estado
useEffect(() => {
    const cargarTareas = async () => {
    const respuesta = await obtenerTareas();
        setTareas(respuesta.data ?? []);
        };
        cargarTareas();
    }, []);

// recarga las tareas desde el backend
// se llama después de crear una tarea nueva
const recargarTareas = async () => {
    const respuesta = await obtenerTareas();
    setTareas(respuesta.data ?? []);
    };

// filtra las tareas completadas para la métrica
const tareasCompletadas = tareas.filter(tarea => tarea.completada === true);

// filtra las tareas pendientes para la métrica
const tareasPendientes = tareas.filter(tarea => tarea.completada === false);

// función para mostrar la fecha actual en español
const fechaActual = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
    });


    return(

    <Layout>
        {/* encabezado responsivo con título y botones apilables en móvil */}
    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8'>

        {/* título y fecha */}
        <div>
            <h1 className='text-xl sm:text-2xl font-extrabold text-gray-800'>Resumen</h1>
            <p className='text-gray-500 text-xs sm:text-sm capitalize'>{fechaActual}</p>
        </div>

        {/* botones de acción con soporte para envolverse en pantallas pequeñas */}
        <div className='flex items-center gap-2 sm:gap-3 flex-wrap'>
        <Link to='/tareas' className='border border-gray-200 text-gray-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors text-center'>
        Ver todas las tareas
        </Link>

        <button
        onClick={() => setModalAbierto(true)}
        className='bg-[#6C4DF6] text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-[#5a3de0] transition-colors text-center'>
        + Nueva tarea
        </button>
        </div>
    </div>



        {/* tarjetas de métricas en cuadrícula adaptable */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8'>

        {/* tarjeta total de tareas */}
        <div className='bg-white rounded-2xl p-5 sm:p-6 shadow-sm'>
            <ListTodo className="w-8 h-8 text-[#6C4DF6] mb-2"></ListTodo>
            <p className='text-3xl sm:text-4xl font-extrabold text-gray-800'>{tareas.length}</p>
            <p className='text-gray-500 text-sm mb-2'>Total de tareas</p>
        </div>

        {/* tarjeta completadas */}
        <div className='bg-white rounded-2xl p-5 sm:p-6 shadow-sm'>
            <CheckCircle className="w-8 h-8 text-[#4df6b2] mb-2"></CheckCircle>
            <p className='text-3xl sm:text-4xl font-extrabold text-gray-800'>{tareasCompletadas.length}</p>
            <p className='text-gray-500 text-sm mb-2'> Tareas Completadas</p>
        </div>

        {/* tarjeta pendientes */}
        <div className='bg-white rounded-2xl p-5 sm:p-6 shadow-sm sm:col-span-2 lg:col-span-1'>
            <Clock className="w-8 h-8 text-[#f6a24d] mb-2"></Clock>
            <p className='text-3xl sm:text-4xl font-extrabold text-gray-800'>{tareasPendientes.length}</p>
            <p className='text-gray-500 text-sm mb-2'>Tareas Pendientes</p>
        </div>
        </div>



        {/* sección últimas tareas */}
        <div className='bg-white rounded-2xl p-5 sm:p-6 shadow-sm w-full'>

        {/* encabezado de la sección */}
        <h2 className='font-bold text-gray-800 mb-1'>Últimas tareas creadas</h2>
        <p className='text-gray-400 text-xs mb-4'>Los últimos días</p>

        {/* lista de tareas */}
        <div className='flex flex-col gap-3'>
            {tareas.slice(-4).map((tarea) => (
        <div key={tarea.id} className='flex items-center justify-between gap-3 py-3 border-b border-gray-100 last:border-0'>
            
            {/* checkbox e info con min-w-0 para evitar desborde en móvil */}
            <div className='flex items-center gap-3 min-w-0 flex-1'>
                {/* checkbox según estado */}
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0
                    ${tarea.completada ? 'bg-[#16C098]' : 'border-2 border-gray-300'}`}>
                    {tarea.completada && <span className='text-white text-xs'>✓</span>}
                </div>
                {/* título truncable si es muy largo */}
                <p className={`text-sm font-medium truncate ${tarea.completada ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {tarea.titulo}
                </p>
            </div>

            {/* badge de estado */}
            <span className={`shrink-0 text-xs px-3 py-1 rounded-full font-medium
                ${tarea.completada ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                {tarea.completada ? 'Completada' : 'Pendiente'}
            </span>
        </div>
        ))}
        </div>
    </div>

    {/* modal para crear tarea desde el dashboard */}
        <ModalTarea
            estaAbierto={modalAbierto}
            onCerrar={() => setModalAbierto(false)}
            onGuardar={async (datos) => {
                await crearTarea(datos);
                setModalAbierto(false);
                recargarTareas();
                }}
            />
</Layout>    
    );
};

export default Dashboard;