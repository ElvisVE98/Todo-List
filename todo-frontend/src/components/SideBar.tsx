import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

// tipo de los props para controlar la apertura y cierre en móvil
type Props = {
    abierto?: boolean;
    onCerrar?: () => void;
};

const Sidebar = ({ abierto = false, onCerrar }: Props) => {

    const { pathname } = useLocation();

    return (
        <>
            {/* fondo oscuro semitransparente para cerrar el sidebar en móvil */}
            <div 
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden
                    ${abierto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onCerrar}
            />

            {/* contenedor del sidebar - fijo/deslizable en móvil y estático en desktop */}
            <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 h-screen bg-white flex flex-col p-6 shadow-sm border-r border-gray-200 transition-transform duration-300 ease-in-out shrink-0
                ${abierto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>

                {/* cabecera del sidebar: logo Tareo y botón cerrar para móvil */}
                <div className='flex items-center justify-between mb-10'>
                    {/* logo e ícono */}
                    <div className='flex items-center gap-2'>
                        <div className='bg-[#6C4DF6] p-2 rounded-xl'>
                            <span className='text-white text-xl'>✓</span>
                        </div>
                        <span className='font-bold text-xl text-gray-800'>Tareo</span>
                    </div>

                    {/* botón para cerrar el sidebar visible solo en móvil */}
                    <button
                        onClick={onCerrar}
                        className='md:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
                        aria-label='Cerrar menú'
                    >
                        <X className='w-5 h-5' />
                    </button>
                </div>

                {/* navegacion */}
                <nav className='flex flex-col gap-2'>
                    
                    {/* link al dashboard - al hacer clic en móvil cierra el sidebar */}
                    <Link 
                        to='/dashboard'
                        onClick={onCerrar}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium
                            ${pathname === '/dashboard' 
                                ? 'bg-purple-100 text-[#6C4DF6]'  // activo
                                : 'text-gray-600 hover:bg-[#F6F5FB] hover:text-[#6C4DF6]' // inactivo
                            }`}
                    >
                        <span>📊</span>
                        Dashboard
                    </Link>

                    {/* link a tareas - al hacer clic en móvil cierra el sidebar */}
                    <Link 
                        to='/tareas'
                        onClick={onCerrar}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium
                            ${pathname === '/tareas' 
                                ? 'bg-purple-100 text-[#6C4DF6]'  // activo
                                : 'text-gray-600 hover:bg-[#F6F5FB] hover:text-[#6C4DF6]' // inactivo
                            }`}
                    >
                        <span>☰</span>
                        Tareas
                    </Link>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;