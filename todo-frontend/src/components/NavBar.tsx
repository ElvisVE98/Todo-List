import { useAuth } from '../context/AuthContext'; // para obtener el nombre del usuario y usar el LogOut
import { useNavigate } from 'react-router-dom'; // navegar hacia el login al hacer logOut
import {Avatar,AvatarFallback} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"



const Navbar = () =>{

///desestructurar useAuth para obtener el usuario y logout
// obtenemos usuario y logout del contexto
const {usuario,logout} =useAuth();
// para redirigir al login después de cerrar sesión
const navegar = useNavigate();


//Obtiene el saludo segun la hora del dia
const obtenerSaludo = () => {
    const hora = new Date().getHours();
    if(hora <12) return 'Buenos dias';
    if(hora <19) return 'Buenas tardes';
    return "Buenas Noches"
};


///Cerar sesion y redirigir al Login
const cerrarSesion = () =>{
    logout()
    navegar('/login');
}


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


    return(
    <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8'>

        {/* agregamos el saludo y el nombre del usuario */}
        <div>
            <h2>{obtenerSaludo()}, {usuario?.nombre?.split(' ')[0]}👋</h2>
        </div>

    {/* avatar con dropdown - aquí va shadcn */}
    <div>

    {/* contenedor del dropdown */}
    <DropdownMenu>

      <DropdownMenuTrigger render={
        <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>              
                <AvatarFallback>{obtenerIniciales()}</AvatarFallback>
            </Avatar>
        </Button>
        }/>

      <DropdownMenuContent className="w-48">

        {/* información del usuario */}
        <div className='px-3 py-2'>
            <p className=' font-semibold text-sm'>{usuario?.nombre}</p>
            <p className='text-xs text-gray-500'>{usuario?.email}</p>
        </div>

       

        <DropdownMenuSeparator />

        

        <DropdownMenuGroup>
          <DropdownMenuItem 
            variant="destructive"
            onClick={cerrarSesion}
            className="cursor-pointer">Cerrar Sesión
            </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
    </div>
    </header>

    );
}

export default Navbar;