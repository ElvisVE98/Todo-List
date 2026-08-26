import {z} from 'zod'


//Schema validacion del Login

export const loginSchema = z.object({
    email : z.string().email('Ingresa un Email Valido'),
    password : z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres')
});


//Schema validacion del registro
export const registroSchema = z.object({
    nombre_completo : z.string().min(2, 'El nombre debe tener minimo 2 caracteres'),
    email: z.string().email('Ingresa un Email válido'),
    password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});