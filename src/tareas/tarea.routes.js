import { Router } from "express";
import { check } from "express-validator";

import {
    tareaPost,
    tareaGet,
    tareaDelete,
    putTarea
} from "./tarea.controller.js";
import { existeTareaById, tareaExistente } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.get("/", tareaGet);

router.post(
    "/",
    [
        check("nombre").custom(tareaExistente),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        check("fechaInicio", "La fecha de inicio es obligatoria").not().isEmpty(),
        check("fechaCierre", "La fecha de cierre es obligatoria").not().isEmpty(),
        check("creador", "El nombre del creador es obligatorio").not().isEmpty(),
        validarCampos
    ],
    tareaPost
);

router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeTareaById),
        validarCampos
    ], tareaDelete)


router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeTareaById),
        validarCampos
    ], putTarea)

export default router;