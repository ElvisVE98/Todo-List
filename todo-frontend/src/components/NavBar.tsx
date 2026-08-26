import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {

    // obtenemos usuario y logout del contexto
    const { usuario, logout } = useAuth();
    // para redirigir al login después de cerrar sesión
    const navegar = useNavigate();

    // saludo según la hora del día
    const obtenerSaludo = () => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días';
        if (hora < 19) return 'Buenas tardes';
        return 'Buenas noches';
    };

    // obtiene las iniciales del nombre para el avatar
    // ejemplo: "Elvis Velasquez" → "EV"
    const obtenerIniciales = () => {
        if (!usuario?.nombre) return 'U';
        return usuario.nombre
            .split(' ')
            .map((palabra) => palabra[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // cierra sesión y redirige al login
    const cerrarSesion = () => {
        logout();
        navegar('/login');
    };

    return (
        // barra superior con sombra suave
        <header className='h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8'>

            {/* saludo con nombre del usuario */}
            <div>
                <h2 className='font-semibold text-gray-800'>
                    {obtenerSaludo()}, {usuario?.nombre?.split(' ')[0]} 👋
                </h2>
            </div>

            {/* lado derecho - campana y avatar */}
            <div className='flex items-center gap-3'>


                {/* dropdown del avatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='rounded-full'>
                            {/* avatar con iniciales del usuario */}
                            <Avatar>
                                <AvatarFallback className='bg-[#6C4DF6] text-white font-semibold'>
                                    {obtenerIniciales()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    {/* menú desplegable */}
                    <DropdownMenuContent align='end' className='w-48'>

                        {/* información del usuario */}
                        <div className='px-3 py-2'>
                            <p className='font-semibold text-sm'>{usuario?.nombre}</p>
                            <p className='text-xs text-gray-500'>{usuario?.email}</p>
                        </div>

                        <DropdownMenuSeparator />

                        {/* cerrar sesión */}
                        <DropdownMenuItem
                            onClick={cerrarSesion}
                            className='text-red-500 cursor-pointer'
                        >
                            Cerrar sesión
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </header>
    );
};

export default Navbar;