import Mongoose from "mongoose";

const userLoginSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
});

export default Mongoose.model("UserLogin", userLoginSchema); // Exportar el esquema userLoginSchema
