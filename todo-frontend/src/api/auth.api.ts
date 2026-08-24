import api from './axios.config';

// llama a POST /auth/registro del backend
export const registrarUsuario = async (datos: {
    nombre_completo: string;
    email: string;
    password: string;
}) => {
    const response = await api.post('/auth/registro', datos);
    return response.data;
};

// llama a POST /auth/login del backend
export const loginUsuario = async (datos: {
    email: string;
    password: string;
}) => {
    const response = await api.post('/auth/login', datos);
    return response.data;
};