import Tarea from "../tareas/tarea.model.js"

export const existeTareaById = async (id = '')=>{
    const existeTarea = await Tarea.findOne({id});
    if(existeTarea){
        throw new Error(`El curso con el ${id} no existe`);
    }
}

export const tareaExistente = async (nombre = '')=>{
    const existeTarea = await Tarea.findOne({nombre});
    if(existeTarea){
        throw new Error(`La tarea ${nombre} ya esta registrada en la base de datos`);
    }
}