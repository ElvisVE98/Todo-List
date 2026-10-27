import { useState } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/NavBar";

// tipo del prop que recibe Layout
// children es el contenido de cada página que va dentro del layout
type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
    // estado para controlar la visibilidad del sidebar en pantallas móviles
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    return (
        <div className='flex h-screen bg-[#F6F5FB] overflow-hidden'>

            {/* sidebar: estático en desktop y drawer deslizable en móvil */}
            <SideBar 
                abierto={sidebarAbierto} 
                onCerrar={() => setSidebarAbierto(false)} 
            />

            {/* contenido principal - ocupa el resto del ancho */}
            <div className='flex flex-col flex-1 min-w-0 overflow-hidden'>

                {/* navbar fijo arriba con trigger para abrir el menú en móvil */}
                <Navbar onAbrirSidebar={() => setSidebarAbierto(true)} />

                {/* contenido de cada página con espaciado adaptable según pantalla */}
                <main className='flex-1 overflow-y-auto p-4 sm:p-6 md:p-8'>
                    {children}
                </main>

            </div>
        </div>
    );
};
export default Layout;