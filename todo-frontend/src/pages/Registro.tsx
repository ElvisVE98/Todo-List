import { useState } from "react";
import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema } from "../schemas/auth.schema";
import type { RegistroDto } from "../types/auth.types";
import { registrarUsuario } from "../api/auth.api";


// tipo del prop que recibe Registro desde AuthPage
// onSwitch activa la animacion del panel para volver al login
type Props = { onSwitch: () => void };


const Registro = ({ onSwitch }: Props) => {

    //estado para mostrar el error general del servidor
    const [error,setError] = useState('');
     //Estado para deshabilitar el boton mientras se envía
    const [cargando,setCargando] = useState(false);

    //UseForm maneja todos los imputs del formulario
    //ZodResolver conecta las reglas de validacion de zod con el formularo
    const { register, handleSubmit, formState:{errors}} = useForm<RegistroDto>({
        resolver:zodResolver(registroSchema)
    })

    //Funcion que se ejecutara cuando el formulario es valido
    //datos viene de react hook form ya validado por zod

    const onSubmit = async(datos:RegistroDto) =>{
        try{
            setCargando(true);
            setError('')

            await registrarUsuario(datos);
            // guarda el nombre en localStorage para usarlo en toda la app
            localStorage.setItem('nombre',datos.nombre_completo);

            onSwitch();
        }catch(err){
            setError('Error al crear la cuenta')
        }finally{
            setCargando(false)
        }
    };

    return (
        <div className='w-full max-w-md'>

            {/* logo */}
            <div className='flex items-center gap-2 mb-8'>
                <div className='bg-[#6C4DF6] p-2 rounded-xl'>
                    <span className='text-white text-xl'>✓</span>
                </div>
                <span className='font-bold text-xl'>Tareo</span>
            </div>

            {/* título y subtítulo */}
            <h1 className='text-3xl mb-2 font-semibold'>Crea tu cuenta</h1>
            <p className='text-gray-500 mb-8'>Es gratis y solo toma un momento.</p>

             {/* error general del servidor */}

             {error && (
                <div className='bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm'>
                    {error}
                </div>
             )}

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* campo nombre */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-sm font-medium text-gray-700'>Nombre</label>
                    <input
                        {...register('nombre_completo')}
                        type='text'
                        placeholder='Tu nombre completo'
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
                    />
                    {errors.nombre_completo && <p className='text-red-500 text-xs'> {errors.nombre_completo.message}</p>}
                </div>

                {/* campo email */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-sm font-medium text-gray-700'>Correo Electrónico</label>
                    <input
                        {...register('email')}
                        type='email'
                        placeholder='tu@email.com'
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
                    />
                    {errors.email && <p className='text-red-500 text-xs'> {errors.email.message}</p>}
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
                    {errors.password && <p className='text-red-500 text-xs'> {errors.password.message}</p>}
                </div>

                {/* botón submit */}
                <button
                    type='submit'
                    disabled={cargando}
                    className='w-full bg-[#6C4DF6] text-white font-semibold py-3 rounded-xl hover:bg-[#5a3de0] transition-colors mt-2'
                >
                    Crear cuenta
                </button>

            </form>

            {/* link al login - onSwitch activa la animacion para volver */}
            <p className='text-center text-sm text-gray-500 mt-6'>
                ¿Ya tienes cuenta?{' '}
                <button
                    onClick={onSwitch}
                    className='text-[#6C4DF6] font-semibold hover:underline'
                >
                    Inicia sesión
                </button>
            </p>

        </div>
    );
};

export default Registro;