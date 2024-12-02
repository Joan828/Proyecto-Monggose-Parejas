const Post = require("../models/Post")

const PostController = {

    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    }
    
}

module.exports = PostController