const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    userId: {
        type: ObjectId,
        ref: 'User',
    },
    commentIds: [{ type: ObjectId, ref: 'Comment' }]
}, { timestamps: true });

PostSchema.index({
    name: "text",
  });
  
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;