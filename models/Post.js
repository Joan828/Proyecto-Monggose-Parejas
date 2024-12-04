const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Por favor rellena tu titulo"],
      },
      body: {
        type: String,
        required: [true, "Por favor rellena tu post"],
      },
    userId: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

PostSchema.index({
    name: "text",
  });
  
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;