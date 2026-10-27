import { useState } from 'react';
import Login from './Login';
import Registro from './Registro';

const AuthPage = () => {

    // controla si se muestra el registro o el login
    // false = login visible, true = registro visible
    const [esRegistro, setEsRegistro] = useState(false);

    // función que calcula las clases del panel de formulario
    // en desktop: posición absoluta y ocupa el 50% de ancho con animación retrasada
    // en móvil: ocupa el ancho completo y oculta el formulario inactivo
    const clasePanel = (visible: boolean) =>
        `w-full lg:w-1/2 lg:inset-y-0 flex items-center justify-center px-4 sm:px-6
         transition-all duration-500
         ${visible
            ? 'opacity-100 translate-y-0 delay-100 lg:delay-[340ms] pointer-events-auto relative lg:absolute'
            : 'opacity-0 translate-y-3.5 pointer-events-none hidden lg:flex lg:absolute'
        }`;

    return (
        // contenedor principal centrado en pantalla con padding adaptable
        <div className='min-h-screen flex items-center justify-center bg-[#d8d5e7] p-4 sm:p-6 lg:p-10'>

            {/* contenedor de autenticación: fluido en móvil y tamaño fijo de dos columnas en escritorio */}
            <div className='relative w-full max-w-md lg:max-w-none lg:w-[1024px] lg:h-[610px] overflow-hidden rounded-2xl bg-white shadow-2xl py-8 px-4 sm:p-8 lg:p-0'>

                {/* panel del login - visible cuando esRegistro es false */}
                <div className={`${clasePanel(!esRegistro)} lg:left-0`}>
                    {/* onSwitch cambia esRegistro a true y activa la transicion */}
                    <Login onSwitch={() => setEsRegistro(true)} />
                </div>

                {/* panel del registro - visible cuando esRegistro es true */}
                <div className={`${clasePanel(esRegistro)} lg:left-1/2`}>
                    {/* onSwitch cambia esRegistro a false y activa la transicion */}
                    <Registro onSwitch={() => setEsRegistro(false)} />
                </div>

                {/* panel morado deslizante - visible en pantallas de escritorio (lg en adelante) */}
                <div className={`hidden lg:block absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden
                                will-change-transform transition-transform duration-[900ms]
                                ${esRegistro ? 'translate-x-0' : 'translate-x-full'}`}>

                    {/* fondo morado con gradiente */}
                    <div className='absolute inset-0 bg-[#6C4DF6] ' />

                    {/* círculo decorativo */}
                    <div className='absolute top-0 right-0 w-64 h-64 bg-[#02c8fa] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50'/>
                    <div className='absolute bottom-0 left-0 w-48 h-48 bg-[#d02db5] rounded-full translate-y-1/2 -translate-x-1/2 opacity-50' />

                    {/* contenido del panel morado */}
                    <div className='relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-12'>

                        {/* arte para cuando se muestra el login (panel a la derecha) */}
                        <div className={`absolute inset-0 flex flex-col justify-center px-12 transition-all duration-500
                                        ${!esRegistro ? 'opacity-100 translate-y-0 delay-[270ms]' : 'opacity-0 translate-y-3.5'}`}>
                            <h2 className='text-3xl font-extrabold mb-4'>Menos ruido, más hecho.</h2>
                            <p className='text-purple-200 mb-8'>Todas tus tareas, con el estado siempre a la vista.</p>

                            {/* preview de tareas */}
                            <div className='flex flex-col gap-3 text-left'>

                                <div className='bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3'>
                                    <div className='w-5 h-5 rounded-full bg-[#16C098] flex items-center justify-center text-xs'>✓</div>
                                    <span className='text-sm line-through opacity-60'>Enviar informe semanal</span>
                                </div>
                                
                                <div className='bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3'>
                                    <div className='w-5 h-5 rounded-full border-2 border-[#FFB020]' />
                                    <span className='text-sm'>Diseñar la nueva landing</span>
                                    <span className='ml-auto text-xs bg-[#FFB020] px-2 py-0.5 rounded-full text-white'>HOY</span>
                                </div>
                                
                                <div className='bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3'>
                                    <div className='w-5 h-5 rounded-full border-2 border-white/50' />
                                    <span className='text-sm'>Llamar al proveedor</span>
                                </div>
                            </div>
                        </div>



                        {/* arte para cuando se muestra el registro (panel a la izquierda) */}
                        <div className={`absolute inset-0 flex flex-col justify-center px-12 transition-all duration-500
                                        ${esRegistro ? 'opacity-100 translate-y-0 delay-[270ms]' : 'opacity-0 translate-y-3.5'}`}>
                            <h2 className='text-3xl font-extrabold mb-4'>Empieza en un minuto.</h2>
                            <p className='text-purple-200'>Sin plantillas complicadas ni configuraciones.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthPage;