import { mock } from 'node:test';
import { prisma } from '../config/prisma';
import * as tareaServices from '../services/tareas.service'


jest.mock('../config/prisma', () =>({
    prisma: {
        tarea: {
            findMany: jest.fn(),    // obtenerTareas
            findUnique: jest.fn(),  // obtenerTareaPorId
            create: jest.fn(),      // crearTarea
            update: jest.fn(),      // actualizarTarea
            delete: jest.fn(),      // eliminarTarea
        }
    }
}));


// probar obtener todas las tareas :
describe('tareasServices', () => {
    describe('obtenerTareas', () => {
        test('Deberia traer todas las tareas', async () => {

            // Arrange
            const mockFindMany = prisma.tarea.findMany as jest.Mock;
            mockFindMany.mockResolvedValue([
                {
                    id: '1',
                    titulo: 'Tarea 1',
                    descripcion: 'Descripcion 1',
                    completada: false,
                    createdAt: new Date()
                },
                {
                    id: '2',
                    titulo: 'Tarea 2',
                    descripcion: 'Descripcion 2',
                    completada: true,
                    createdAt: new Date()
                }
            ]); // ← aquí cierra el array y el mockResolvedValue

            // Act
            const resultado = await tareaServices.obtenerTareas();

            // Assert
            expect(resultado).toHaveLength(2);
            expect(resultado[0]?.titulo).toBe('Tarea 1');

        });
    });



    // probar obtener todas las tareas :
    describe('obtenerTareaPorId', () => {
        test('Deberia devolver una tarea segun su ID', async() =>{
            
            // Arrange
            const id = '1'
            const mockFindUnique = prisma.tarea.findUnique as jest.Mock;
            mockFindUnique.mockResolvedValue({
                
                    id: '1',
                    titulo: 'Tarea 1',
                    descripcion: 'Descripcion 1',
                    completada: false,
                    createdAt: new Date()
            });

            //act
            const resultado = await tareaServices.obtenerTareaPorId(id)

            //assert
            expect(resultado?.id).toBe('1')
        })
    })

    // probar crear tareas :
    describe('crearTarea', () =>{
        test('Deberia poder Crear un usuario',async() =>{

            //Arrange

            const datosCrearTarea = {
                titulo: 'prueba 1',
                descripcion:'First Testing'
            }
            
            const mockCreate = prisma.tarea.create as jest.Mock;
            mockCreate.mockResolvedValue({
                id : '1',        
                titulo : 'prueba 1',    
                descripcion : 'First Testing',
                completada : false, 
                createdAt : new Date()
            })

            //Act
            const resultado = await tareaServices.crearTarea(datosCrearTarea);

            //Assert

            expect(resultado.titulo).toBe('prueba 1');
            expect(resultado.completada).toBe(false);
        })
    })


    // probar actualizar tareas :
    describe('actualizarTarea', () =>{
        test('Deberia Actualizar una Tarea',async() =>{

            //arrange
            const id = '1'
            const datosActualizarTarea = {

                titulo : 'prueba 1',
                descripcion: 'First Testing',
                completada: true,                
            }

            const mockUpdate = prisma.tarea.update as jest.Mock;
            mockUpdate.mockResolvedValue({
                 id : '1',        
                titulo : 'prueba 1',    
                descripcion : 'First Testing',
                completada : true, 
                createdAt : new Date()
            })
            
            //act
            const resultado = await tareaServices.actualizarTarea(id,datosActualizarTarea);

            //assert

            expect(resultado.id).toBe('1');
            expect(resultado.titulo).toBe('prueba 1');
            expect(resultado.completada).toBe(true);

        })
    })



    // probar eliminar tareas :

    describe('eliminarTarea', () =>{
        test('Deberia Eliminar una tarea', async () =>{

            //Arrange
            const id = '1'
            const mockDelete = prisma.tarea.delete as jest.Mock;
            mockDelete.mockResolvedValue({
                id : '1',        
                titulo : 'prueba 1',    
                descripcion : 'First Testing',
                completada : true, 
                createdAt : new Date()
            })

            //act
            const resultado = await tareaServices.eliminarTarea(id)

            //assert

            expect(resultado.id).toBe('1')
        })
    })
});

