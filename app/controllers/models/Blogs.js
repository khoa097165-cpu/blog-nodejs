const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const Blog = new Schema({
    name: { type: String, require: true },
    content: { type: String },
    tag: { type: String },
    img: { type: String },
    author_img: { type: String, },
    author_name: { type: String, },
    slug: { type: String, slug: 'name', unique: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', Blog);   