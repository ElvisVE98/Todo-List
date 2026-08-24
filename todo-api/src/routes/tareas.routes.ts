import { Router } from "express";
import * as tareasController from '../controllers/tareas.controller.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";

//import {obtenerTareas,obtenerTareaPorId, crearTarea,actualizarTarea, eliminarTarea} from '../controllers/tareas.controller.js';

const router = Router();

router.get('/',authMiddleware,tareasController.obtenerTareas);
router.get('/:id',authMiddleware,tareasController.obtenerTareaPorId);
router.post('/',authMiddleware,tareasController.crearTarea);
router.put('/:id',authMiddleware,tareasController.actualizarTarea);
router.delete('/:id',authMiddleware,tareasController.eliminarTarea);

export default router;