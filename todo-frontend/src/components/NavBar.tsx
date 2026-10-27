import { useAuth } from '../context/AuthContext'; // para obtener el nombre del usuario y usar el LogOut
import { useNavigate } from 'react-router-dom'; // navegar hacia el login al hacer logOut
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

// tipo del prop para abrir el sidebar en pantallas móviles
type Props = {
    onAbrirSidebar?: () => void;
};

const Navbar = ({ onAbrirSidebar }: Props) => {

    ///desestructurar useAuth para obtener el usuario y logout
    // obtenemos usuario y logout del contexto
    const { usuario, logout } = useAuth();
    // para redirigir al login después de cerrar sesión
    const navegar = useNavigate();

    // Obtiene el saludo segun la hora del dia
    const obtenerSaludo = () => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días';
        if (hora < 19) return 'Buenas tardes';
        return "Buenas noches";
    };

    /// Cerrar sesion y redirigir al Login
    const cerrarSesion = () => {
        logout();
        navegar('/login');
    };

    // obtiene las iniciales del nombre para el avatar
    // ejemplo: "Elvis Velasquez" → "EV"
    const obtenerIniciales = () => {
        if (!usuario?.nombre) return 'U';
        return usuario.nombre
            .split(' ')           // divide por espacio → ["Elvis", "Velasquez"]
            .map((palabra) => palabra[0])  // toma la primera letra de cada palabra → ["E", "V"]
            .join('')             // une las letras → "EV"
            .toUpperCase()        // mayúsculas → "EV"
            .slice(0, 2);         // máximo 2 caracteres
    };

    return (
        <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 md:px-8'>

            {/* lado izquierdo: botón hamburguesa (móvil) y saludo del usuario */}
            <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
                {/* botón hamburguesa visible solo en dispositivos móviles */}
                <button
                    onClick={onAbrirSidebar}
                    className='md:hidden p-2 -ml-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                    aria-label='Abrir menú'
                >
                    <Menu className='w-5 h-5' />
                </button>

                {/* agregamos el saludo y el nombre del usuario con soporte para texto responsivo */}
                <h2 className='text-sm sm:text-base font-semibold text-gray-800 truncate'>
                    {obtenerSaludo()}, {usuario?.nombre?.split(' ')[0]} 👋
                </h2>
            </div>

            {/* avatar con dropdown - alineado para que no se desborde en móvil */}
            <div className='shrink-0'>
                {/* contenedor del dropdown */}
                <DropdownMenu>

                    <DropdownMenuTrigger render={
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar>              
                                <AvatarFallback>{obtenerIniciales()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    }/>

                    {/* menú desplegable con alineación derecha para evitar desborde en móvil */}
                    <DropdownMenuContent className="w-48" align="end">

                        {/* información del usuario */}
                        <div className='px-3 py-2'>
                            <p className='font-semibold text-sm truncate'>{usuario?.nombre}</p>
                            <p className='text-xs text-gray-500 truncate'>{usuario?.email}</p>
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem 
                                variant="destructive"
                                onClick={cerrarSesion}
                                className="cursor-pointer"
                            >
                                Cerrar Sesión
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Navbar;