import api from './axios.config';

// llama a GET /tareas del backend
export const obtenerTareas = async () => {
    const response = await api.get('/tareas');
    return response.data;
   
};

// llama a POST /tareas del backend
export const crearTarea = async (datos: { titulo: string; descripcion: string; completada: boolean }) => {
    const response = await api.post('/tareas', datos);
    return response.data;
};

// llama a PUT /tareas/:id del backend
export const actualizarTarea = async (id: string, datos: { titulo: string; descripcion: string; completada: boolean }) => {
    const response = await api.put(`/tareas/${id}`, datos);
    return response.data;
};

// llama a DELETE /tareas/:id del backend
export const eliminarTarea = async (id: string) => {
    const response = await api.delete(`/tareas/${id}`);
    return response.data;
};