const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 255,
        },

        description: {
            type: String,
            maxlength: 600,
        },

        image: {
            type: String,
            maxlength: 255,
        },

        // CHỦ ĐỀ
        category: {
            type: String,
            enum: [
                'cong-nghe',
                'the-thao',
                'giai-tri',
                'doi-song',
                'kinh-te',
                'du-lich',
                'suc-khoe'
            ],
            default: 'cong-nghe'
        },

        slug: {
            type: String,
            slug: 'name',
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Blog', Blog);