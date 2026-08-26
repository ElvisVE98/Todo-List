import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";

const Dashboard = () =>{
   
    return(
        // contenedor principal con flex para sidebar + contenido
        <div className='flex h-screen bg-[#F6F5FB]'>
            
            {/* sidebar izquierdo */}
            <SideBar />

            {/* contenido principal - ocupa el resto del ancho */}
            <div className='flex flex-col flex-1 overflow-hidden'>
                
                {/* navbar superior */}
                <Navbar />

                {/* aquí irá el contenido de cada página */}
                <main className='flex-1 overflow-y-auto p-8'>
                    <p>Contenido de Tareas</p>
                </main>

            </div>
        </div>
    );
};

export default Dashboard;