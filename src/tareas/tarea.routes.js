import { Router } from "express";
import { check } from "express-validator";

import {
    tareaPost,
    tareaGet
} from "./tarea.controller.js";

const router = Router();

router.get("/", tareaGet);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        check("fechaInicio", "La fecha de inicio es obligatoria").not().isEmpty(),
        check("fechaCierre", "La fecha de cierre es obligatoria").not().isEmpty(),
        check("creador", "El nombre del creador es obligatorio").not().isEmpty(),
    ],
    tareaPost
);

export default router;