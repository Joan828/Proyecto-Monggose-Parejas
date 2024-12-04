const Post = require("../models/Post")
const User = require('../models/User.js')

const PostController = {

    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },
    async getPostByTitle(req, res) {
        try {
          if(req.params.title.length>20){
            return res.status(400).send('Búsqueda demasiado larga')
          }
          const title = new RegExp(req.params.title, "i");
          const post = await Post.find({title});
          res.send(post);
        } catch (error) {
          console.log(error);
        }
      },
      async getAllPosts(req, res) {
        try {
           const posts = await Post.find()
           res.send(posts)
        } catch (error) {
            console.error(error);
        }
    },  
    async getAllPostsAndUsers(req, res) {
        try {
          const posts = await Post.find()
          .populate("userId",["name"])
          .populate("commentIds",["body"])
        res.status(200).send(posts)
        } catch (error) {
            console.error(error);
        }
    }, 
    async create(req,res){
        try {
          const newPost = await Post.create({...req.body, userId: req.user._id})                      
          await User.findByIdAndUpdate(req.user._id, { $push: { postIds: newPost._id } })

          res.status(201).send({message:"New post successfully created",newPost})

        }catch (error) {
          console.error(error);
          res.status(500).send({message:"There was a problem",error})
        } 
    },
    async getInfo(req, res) {
      try {
        const posts = await Post.find()
        res.send(posts);
      } catch (error) {
        console.error(error);
      }
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ message: 'Post deleted', post })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the post'})
        }
    },
    async update(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { ...req.body, 
                // userId: req.user._id 
            },
            {
              new: true,
            }
        )
          res.send({ message: "post successfully updated", post });
        } catch (error) {
          console.error(error);
        }
      },
      async like(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { likes: req.user._id } },
            { new: true }
          )
          await User.findByIdAndUpdate(
            req.user._id,
            { $push: { likesPostList: req.params._id } },
            { new: true }
          )
    
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: "There was a problem with your like" });
        }
      }
    
}

module.exports = PostController