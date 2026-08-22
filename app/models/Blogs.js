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
            maxlength: 10000,
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
                'bat-dong-san',
                'du-lich',
                'suc-khoe',
                'xe'
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