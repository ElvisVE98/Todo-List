

// tipo del prop que recibe Registro desde AuthPage
// onSwitch activa la animacion del panel para volver al login
type Props = { onSwitch: () => void };

const Registro = ({ onSwitch }: Props) => {

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

            <form>

                {/* campo nombre */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-sm font-medium text-gray-700'>Nombre</label>
                    <input
                        type='text'
                        placeholder='Tu nombre completo'
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
                    />
                </div>

                {/* campo email */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-sm font-medium text-gray-700'>Correo Electrónico</label>
                    <input
                        type='email'
                        placeholder='tu@email.com'
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
                    />
                </div>

                {/* campo contraseña */}
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-sm font-medium text-gray-700'>Contraseña</label>
                    <input
                        type='password'
                        placeholder='••••••••'
                        className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4DF6]'
                    />
                </div>

                {/* botón submit */}
                <button
                    type='submit'
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