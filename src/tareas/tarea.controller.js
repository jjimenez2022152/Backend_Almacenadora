import { response, request } from "express";
import Tarea from './tarea.model.js';

export const tareaGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, tareas] = await Promise.all([
            Tarea.countDocuments(query),
            Tarea.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            tareas
        });
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const tareaPost = async (req, res) => {
    try {
        const { nombre, descripcion, fechaInicio, fechaCierre, creador } = req.body;

        const nuevaTarea = new Tarea({
            nombre,
            descripcion,
            fechaInicio,
            fechaCierre,
            creador
        });

        await nuevaTarea.save();

        res.status(200).json({ tarea: nuevaTarea });
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const tareaDelete = async (req, res) =>{
    const {id} = req.params;
    const tarea = await Tarea.findByIdAndUpdate(id, {estado:false});
    const tareaAuntenticada = req.tarea;

    res.status(200).json({
        msg: 'Tarea a eliminar',
        tarea,
        tareaAuntenticada
    })
}

export const putTarea = async (req, res = respone) =>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const tarea = await Tarea.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: 'Tarea actualizada exitosamente!!',
        tarea
    })
}

