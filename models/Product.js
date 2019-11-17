const { model, Schema } = require('mongoose')

const productSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    categories: [
        {
            body: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Product', productSchema)