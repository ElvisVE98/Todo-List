import {Routes, Route, BrowserRouter,Navigate} from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Tareas from './pages/Tareas';
import AuthPage from './pages/AuthPage';

const App = () => {
   //Devuelve si esta autentificado de nuestro context
  // desestructura solo estaAutenticado
  // aunque el contexto también tiene token, usuario, login, logout
   const {estaAutenticado} = useAuth();
 
  return (

    <BrowserRouter>
      <Routes>
        {/*Rutas Publicas*/ }

        <Route path="/login" element={<AuthPage />} />
        <Route path="/registro" element={<AuthPage />} />

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
