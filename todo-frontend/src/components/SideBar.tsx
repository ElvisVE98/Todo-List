import { Link,useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Sidebar = () => {

    // obtenemos el usuario del contexto para mostrar su nombre
    const { usuario } = useAuth();

    const { pathname } = useLocation();

    return (
        // contenedor del sidebar - fijo a la izquierda, alto completo
        <aside className='w-64 h-screen bg-white flex flex-col p-6 shadow-sm border-r border-gray-200'>

            {/* logo */}
            <div className='flex items-center gap-2 mb-10'>
                <div className='bg-[#6C4DF6] p-2 rounded-xl'>
                    <span className='text-white text-xl'>✓</span>
                </div>
                <span className='font-bold text-xl'>Tareo</span>
            </div>

            {/* navegacion */}
            <nav className='flex flex-col gap-2'>
                
                {/* aquí irán los links */}
                <Link to='/dashboard'
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium
                    ${pathname === '/dashboard' 
                        ? 'bg-purple-100 text-[#6C4DF6]'  // activo
                        : 'text-gray-600 hover:bg-[#F6F5FB] hover:text-[#6C4DF6]' // inactivo
                    }`}
                    >
                <span>📊</span>
                Dashboard
                </Link>

                {/* link a tareas */}
                <Link to='/tareas'
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

            {/* card motivacional - abajo del todo */}
            <div className='mt-auto'>
                {/* aquí irá la card */}
                <div className='bg-[#6C4DF6] rounded-2xl p-4 text-white'>
                <p className='font-bold text-sm mb-1'>Buen ritmo, {usuario?.nombre}👋</p>
                <p className='text-xs text-purple-200 mb-3'>Organiza tu día y cumple tus metas.</p>
    
    {/* barra de progreso decorativa */}
    <div className='bg-white/20 rounded-full h-1.5'>
        <div className='bg-white rounded-full h-1.5 w-2/3' />
    </div>
</div>
            </div>

        </aside>
    );
};

export default Sidebar;