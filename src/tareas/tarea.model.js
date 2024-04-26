import mongoose from 'mongoose';

const tareaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la tarea es obligatorio"],
    },
    descripcion: {
        type: String,
        required: [true, "La descripción de la tarea es obligatoria"],
    },
    fechaInicio: {
        type: Date,
        required: [true, "La fecha de inicio de la tarea es obligatoria"],
    },
    fechaCierre: {
        type: Date,
        required: [true, "La fecha de cierre de la tarea es obligatoria"],
    },
    estado: {
        type: String,
        enum: ["completa", "incompleta"],
        default: "incompleta",
    },
    creador: {
        type: String,
        required: [true, "El nombre del creador de la tarea es obligatorio"],
    },
});

export default mongoose.model('Tarea', tareaSchema);