const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
    body: String,
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    postId: {
        type: ObjectId,
        ref: 'Post'
    },


}, { timestamps: true });

CommentSchema.index({
    name: "text",
  });
  
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;