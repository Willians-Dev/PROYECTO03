import Mongoose from "mongoose";

const userRegisterSchema = new Mongoose.Schema({
  id: {
    type: Object,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  perfil_id: {
    type: Number,
    required: true,
  },
  genero_id: {
    type: Number,
    required: true,
  },
});

export default Mongoose.model("User", userRegisterSchema);
