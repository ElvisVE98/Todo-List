import {Routes, Route, BrowserRouter,Navigate} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Tareas from './pages/Tareas';

const App = () => {
   //Devuelve si esta autentificado de nuestro context
  // desestructura solo estaAutenticado
  // aunque el contexto también tiene token, usuario, login, logout
   const {estaAutenticado} = useAuth();
 
  return (

    <BrowserRouter>
      <Routes>
        {/*Rutas Publicas*/ }

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/*Rutas Privadas*/ }
        <Route path="/dashboard" element={estaAutenticado ? <Dashboard /> : <Navigate to = "/login" />} />
        <Route path="/tareas" element={ estaAutenticado ? <Tareas /> : <Navigate to = "/login"/>} />

        {/* Ruta raíz */}

        <Route path="/" element={<Navigate to={estaAutenticado ? "/dashboard" : "/login"} />} />      
      </Routes>
    </BrowserRouter>
  );
}
export default App;
