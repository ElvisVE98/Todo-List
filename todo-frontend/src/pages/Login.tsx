import {useForm} from 'react-hook-form'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {loginSchema} from '../schema/auth.schema';
import type {LoginDto} from '../types/auth.types';
import { loginUsuario } from '../api/auth.api';
import { useNavigate } from 'react-router-dom'; //EQUIVALENTE AL HREF DE HTML
import { useAuth } from '../context/AuthContext';




const Login = () =>{

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
            login(respuesta.data, {email:datos.email, nombre: ''});

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

        <div className='min-h-screen flex items-center justify-center bg-linear-to-tl from-slate-50 to-violet-300'>
            <h1>Iniciar Sesión</h1>

            {/*Muestra Error general del Servidor*/}
            {error && <p>{error}</p>}

            {/*HandleSubmit valida primero con Zod, luego llama onSubmit*/}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/*register conecta este input al formulario*/}
                <input {...register('email')}
                type='email'
                placeholder='Correo Electronico'>
                </input>

                {/**Muestra el error de zod si el Email esta mal */}

                {errors.email && <p>{errors.email.message}</p>}

                <input {...register('password')}
                type='password'
                placeholder='Contraseña'>
                </input>

                 {/**Muestra el error de zod si la contraseña esta mal */}

                 {errors.password && <p>{errors.password.message}</p>}

                 {/**el "disabled" evita multiples envios mientra carga */}
                 <button type='submit' disabled={cargando}>
                    {cargando ? 'Cargando...' : 'Iniciar Sesión'}
                 </button>


            </form>
        </div>
        
    );
}

export default Login;