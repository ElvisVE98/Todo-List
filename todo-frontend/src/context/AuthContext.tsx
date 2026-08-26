import { createContext, useState, useContext } from 'react';

//se definen las interfaces ya que no se usaran en otros archivos, por eso no se crea una carpeta para ellas
//define la forma de los datos del usuario
interface Usuario {
    email: string;
    nombre: string;
}
//define todo lo que tendra disponible el contexto
//el authcontext conversa con el backend , los archivos de auth.controller.ts y auth.service.ts
interface AuthContextType {
    token: string | null;
    usuario: Usuario | null;
    //el boolean es para verificar si el usuario esta autenticado
    estaAutenticado: boolean;
    // se llama una vez que el endpoint de auth/login es exitoso
    login: (token: string, usuario: Usuario) => void;
    //se borra el token y al usuario del localStorage
    logout: () => void;
}

//se crea el context o la caja vacia donde se guardaran los datos del usuario
const AuthContext = createContext<AuthContextType | null>(null);
// el createcontext es un hook que crea el contexto, le pasamos el AuthContextType y le decimos que puede ser 

//este es el componente que llena la caja vacia con los datos del usuario
//el children es el contenido que se le pasa al componente AuthProvider y el React.ReactNode es el tipo de dato que se le pasa al componente
export const AuthProvider = ({children }: {children: React.ReactNode}) =>{
    //UseState es el Hook que cambia el estado de un componente, guardara el token
    //primero busca en el localstorage por si el usuario ya inicio sesion y tiene un token guardado
    const [token,setToken] = useState <string | null> (localStorage.getItem('token'));
    // Otro UseState para guardar los datos del usuario
    const [usuario, setUsuario] = useState<Usuario | null>(
        localStorage.getItem('nombre') ? {email: '',nombre: localStorage.getItem('nombre')!}: null
    );

    //funcion para guardar el token y los datos del usuario en el localStorage
    const login = (nuevoToken: string, datosUsuario: Usuario) => {
        // guarda el token en localStorage para que persista si el usuario cierra el browser
        localStorage.setItem('token', nuevoToken);
        // actualiza el estado del token
        setToken(nuevoToken);
        // actualiza el estado del usuario
        setUsuario(datosUsuario);
    };
    //funcion para eliminar el token y los datos del usuario del localStorage
    const logout = () => {
        // elimina el token del localStorage
        localStorage.removeItem('token');
        // limpia el estado del token
        setToken(null);
        // limpia el estado del usuario
        setUsuario(null);
    };

    // el return es el componente que se renderiza en el archivo App.tsx, lleva el authcontext con los datos del usuario y la funcion para login y logout

    //que hace esto? : es el componente que llena la caja del AuthContext y lo pone disponible
    // "!!token" lo convierte en booleano, si hay token es true, si es null es false
    // el children renderiza todo lo que va dentro del authContext, sin esto, los componentes hijos, no salen en pantalla
    return (
        <AuthContext.Provider value={{ token, usuario, estaAutenticado: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// el Hook UseAuth va afuera
//es el atajo para acceder al authContext, en vez de copiar useContext(AuthContext) en cada componente, solo se i,porta el useAuth
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) throw new Error ('UseAuth debe usarse dentro de AuthProvider');
    return context;
};