import api from './axios.config';

// llama a GET /tareas del backend
export const obtenerTareas = async () => {
    const response = await api.get('/tareas');
    return response.data;
};