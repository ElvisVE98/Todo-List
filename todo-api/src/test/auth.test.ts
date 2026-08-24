import { prisma } from '../config/prisma';
import * as authService from '../services/auth.service';
import bcrypt from 'bcryptjs';

// jest.mock intercepta las importaciones antes de que el código corra
// y las reemplaza con versiones falsas que tú controlas
// Siempre va fuera de cualquier describe, al inicio del archivo

// Mock de Prisma - reemplaza la conexión real a PostgreSQL
// Solo mockeamos las funciones que realmente usa auth.service.ts
jest.mock('../config/prisma', () => ({
    prisma: {
        usuario: {
            create: jest.fn(),     // jest.fn() crea una función vacía controlable
            findUnique: jest.fn(), // se le dice qué devolver dentro de cada test
        }
    }
}));

// Mock de bcryptjs - evita encriptación real en los tests
jest.mock('bcryptjs', () => ({
    hash: jest.fn(),    // simula encriptar contraseña
    compare: jest.fn(), // simula comparar contraseñas
}));

describe('authService', () => {  // agrupa todos los tests del service

    describe('registro', () => {  // agrupa los tests de la función registro
        test('Deberia Crear un usuario correctamente', async () => {

            // Arrange - preparas los datos y programas los mocks
            const datosRegistros = {
                email: 'test@gmail.com',
                password: '123456',           // contraseña real que manda el usuario
                nombre_completo: 'Usuario_Test'
            };

            // as jest.Mock → le dice a TypeScript que confíe en que tiene métodos de mock
            // mockResolvedValue → le dices qué devolver (async, por eso Resolved)
            // simula lo que devolvería PostgreSQL al guardar el usuario
            const mockCreate = prisma.usuario.create as jest.Mock;
            mockCreate.mockResolvedValue({
                id: '123',
                email: 'test@gmail.com',
                nombre: 'Usuario_Test',
                password: '$2b$10$hasheada', // password encriptada que devuelve la BD
                createdAt: new Date()
            });

            // Act - ejecutas la función real con los datos del Arrange
            const resultado = await authService.registro(datosRegistros);

            // Assert - verificas que el resultado es correcto
            expect(resultado.email).toBe('test@gmail.com');
            expect(resultado).not.toHaveProperty('password'); // verifica que quitamos la password
        });
    });

    

    describe('login', () => {  // agrupa los tests de la función login
        test('Deberia Ingresar el usuario correctamente', async () => {

            // Arrange
            const datosLogin = {
                email: 'test@gmail.com',
                password: '123456' // contraseña que escribe el usuario, no la encriptada
            };

            // Simula que findUnique encontró el usuario en la BD
            const mockFindUnique = prisma.usuario.findUnique as jest.Mock;
            mockFindUnique.mockResolvedValue({
                id: '123',
                email: 'test@gmail.com',
                nombre: 'Usuario_Test',
                password: '$2b$10$hasheada', // password encriptada guardada en la BD
                createdAt: new Date()
            });

            // Simula que bcrypt.compare devuelve true (contraseña correcta)
            const mockCompare = bcrypt.compare as jest.Mock;
            mockCompare.mockResolvedValue(true);

            // Act
            const resultado = await authService.login(datosLogin);

            // Assert - el login devuelve un token que siempre es un string
            expect(typeof resultado).toBe('string');
        });
    });

});