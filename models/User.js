const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor rellena tu nombre"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Este correo no es válido"],
      required: [true, "Por favor rellena tu correo"],
    },
    password: {
      type: String,
      required: [true, "Por favor rellena tu contraseña"],
    },
    birthday: {
      type: Date,
      required: [true, "Por favor rellena tu fecha de nacimiento"],
    },
    role: { type: String, default: "user"},
    tokens: [],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;