import SideBar from "../components/SideBar";
import Navbar from "../components/NavBar";



// tipo del prop que recibe Layout
// children es el contenido de cada página que va dentro del layout
type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
    return (
        
        <div className='flex h-screen bg-[#F6F5FB]'>

        {/* sidebar fijo a la izquierda - siempre visible */}
        <SideBar />

        {/* contenido principal - ocupa el resto del ancho */}
        <div className='flex flex-col flex-1 overflow-hidden'>

            {/* navbar fijo arriba - siempre visible */}
            <Navbar />

            {/* contenido de cada página - esto cambia según la página */}
            <main className='flex-1 overflow-y-auto p-8'>
                {children}
            </main>

        </div>
    </div>
    );
};
export default Layout;