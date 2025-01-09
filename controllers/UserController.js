require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const UserController = {
    async create(req,res,next){
      try {
        if(!req.body.password) return res.status(400).send("Rellena tu contraseña")
          const password = bcrypt.hashSync(req.body.password,10)
          const user = await User.create({...req.body, password:password, role:"user"})
          res.status(201).send({message:"Usuario creado correctamente",user})
      } catch (error) {
        next(error)
      }
    },
    async getAllUsers(req, res) {
      try {
         const users = await User.find().sort({createdAt:-1})
         res.send(users)
      } catch (error) {
          console.error(error);
      }
  },
  async getUserLogged(req, res) {
    try {
      const user = await User.findById(req.user._id,{});
      res.status(200).send({message: "El usuario conectado es:", user});
    } catch (error) {
        console.error(error);
    }
},
async getInfo(req, res) {
  try {
    const user = await User.findById(req.user._id)
    .populate("postIds")
    .populate("likesPostList",["title","body"])
    res.send(user);
  } catch (error) {
    console.error(error);
  }
},
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })

            if (!user) {
              return res.status(400).send({ message: "Correo o contraseña incorrectos" });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({message: "Correo o contraseña incorrectos"})
            }

          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ' + user.name, token, user });
        } catch (error) {
            console.error(error);
        }
    },
    async logout(req, res) {
        try {
          await User.findByIdAndUpdate(req.user._id, {
            $pull: { tokens: req.headers.authorization },
          });
          res.send({ message: "Desconectado con éxito" });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            message: "Hubo un problema al intentar desconectar al usuario",
          });
        }
      }
}
module.exports = UserController