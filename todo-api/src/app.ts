import express from 'express';
import tareasRoutes from './routes/tareas.routes.js';
import authRoutes from './routes/auth.routes.js'
import {envs} from './config/envs.js';
import cors from 'cors'

const app = express();// aqui crea la aplicacion, es el servidor en si, es el objeto que se encarga de manejar las rutas, los middlewares, las peticiones y las respuestas, es el core de la aplicacion, es el que se encarga de recibir las peticiones y devolver las respuestas, es el que se encarga de manejar todo lo relacionado con el servidor, es el que se encarga de escuchar en un puerto y responder a las peticiones que llegan a ese puerto

app.use(express.json());//esto sirve para que el servidor pueda entender las peticiones con cuerpo en formato JSON, es decir, para parsear el cuerpo de las peticiones entrantes como JSON y ponerlo a disposición en req.body

// Permite que acepte peticiones que venga del localhost 5174
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174','https://tareoapp.netlify.app'],
    credentials: true,

}))

app.get('/',(req,res)=> {
    res.json({message: 'API corriendo correctamente'});
});


/*Importaciones de las rutas*/ 
app.use('/tareas',tareasRoutes);
app.use('/auth',authRoutes);



app.listen(envs.PORT,()=>{
    console.log(`'servidor corriendo en puerto ${envs.PORT}'`);
})
