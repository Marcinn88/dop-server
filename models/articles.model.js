const mongoose = require("mongoose");
const { Schema } = mongoose;

const article = new Schema({
    title: {
      type: String,
      required: [true, 'Tytuł Artykułu.'],
    },
    date: {
        type: Object,
        day:{type: String},
        month:{type: String},
        year:{type: String}
    },
    photo_position: {
        type: String,
      },
    photo: {
          type: String,
        },
    text1: {
        type: String,
      },
    text2: {
        type: String,
      },
    text3: {
        type: String,
      },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
  })
  
const Article = mongoose.model('article', article, "articles")

module.exports = Article;