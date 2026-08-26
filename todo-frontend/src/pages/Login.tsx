import {useForm} from 'react-hook-form'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {loginSchema} from '../schemas/auth.schema';
import type {LoginDto} from '../types/auth.types';
import { loginUsuario } from '../api/auth.api';
import { useNavigate } from 'react-router-dom'; //EQUIVALENTE AL HREF DE HTML
import { useAuth } from '../context/AuthContext';



// Props define qué recibe el componente
// onSwitch es una función que no recibe nada y no devuelve nada
type Props = {onSwitch: () => void};

const Login = ({onSwitch}: Props) =>{

    //estado para mostrar el error general del servidor
    const [error,setError] = useState('');
    //Estado para deshabilitar el boton mientras se envía
    const [cargando,setCargando] = useState(false);

    // hook para acceder a la función login del AuthContext
    const {login} = useAuth();
    // hook para navegar entre páginas programáticamente
    const navegar = useNavigate();

    //UseForm maneja todos los imputs del formulario
    //ZodResolver conecta las reglas de validacion de zod con el formularo
    const {register, handleSubmit, formState: {errors}} = useForm<LoginDto>({
        resolver :zodResolver(loginSchema)
    })
    
    //Funcion que se ejecutara cuando el formulario es valido
    //datos viene de react hook form ya validado por zod
    // se conecta con auth.api.ts que llama el backend
    const onSubmit = async (datos:LoginDto) =>{
        try{
            setCargando(true);
            setError('');

            //llama a POST /auth/login del backend via Auth.api.ts
            const respuesta = await loginUsuario(datos);

            //guarda el token en el authcontext y localstorage
            //respuesta.data es el token que devuelve el backend
            // leer el nombre guardado en localStorage
            const nombreGuardado = localStorage.getItem('nombre') ?? '';

            login(respuesta.data, {email:datos.email, nombre: nombreGuardado});

            //redirige al dashboard
            navegar('/dashboard');
        }catch(err){
            //muestra error si el backend responde con error
            setError('Email o contraseña Incorrectos')
        }finally{
            setCargando(false)
        }
    };



    return(
        
            <div className='w-full max-w-md'>
    
                {/* logo */}
                <div className='flex items-center gap-2 mb-8'>
                    <div className='bg-[#6C4DF6] p-2 rounded-xl'>
                        <span className='text-white text-xl'>✓</span>
                    </div>
                    <span className='font-bold text-xl'>Tareo</span>
                </div>
    
                {/* título y subtítulo */}
                <h1 className='text-3xl mb-2 font-semibold'>Bienvenido de Vuelta</h1>
                <p className='text-gray-500 mb-8'>Organiza tu día en un solo lugar.</p>
    
                {/* error general del servidor */}
                {error && (
                    <div className='bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm'>
                        {error}
                    </div>
                )}
    
                <form onSubmit={handleSubmit(onSubmit)}>
    
                    {/* campo email */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label className='text-sm font-medium text-gray-700'>Correo Electrónico</label>
                        <input
                            {...register('email')}
                            type='email'
                            placeholder='tu@email.com'
                            className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
                        />
                        {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
                    </div>
    
                    {/* campo contraseña */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <label className='text-sm font-medium text-gray-700'>Contraseña</label>
                        <input
                            {...register('password')}
                            type='password'
                            placeholder='••••••••'
                            className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
                        />
                        {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                    </div>
    
                    {/* botón submit */}
                    <button
                        type='submit'
                        disabled={cargando}
                        className='w-full bg-[#6C4DF6] text-white font-semibold py-3 rounded-xl hover:bg-[#5a3de0] transition-colors disabled:opacity-50 mt-2'
                    >
                        {cargando ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
    
                </form>
    
                {/* link al registro - ahora usa onSwitch en vez de Link */}
                {/* onSwitch activa la animación del panel en AuthPage */}
                <p className='text-center text-sm text-gray-500 mt-6'>
                    ¿No tienes cuenta?{' '}
                    <button
                        onClick={onSwitch}
                        className='text-[#6C4DF6] font-semibold hover:underline'
                    >
                        Regístrate
                    </button>
                </p>
    
            </div>
        );
    };

export default Login;