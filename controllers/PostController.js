const Post = require("../models/Post")

const PostController = {
    async create(req, res) {
        try {
          const post = await Post.create({
            ...req.body,
            status: "pending",
            deliveryDate: new Date().setDate(new Date().getDate() + 2),
            userId: req.user._id,
          });
          res.status(201).send(post);
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
                userId: req.user._id 
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
}

module.exports = PostController