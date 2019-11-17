const { AuthenticationError } = require('apollo-server')

const Product = require('../../models/Product')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getProducts(){
            try{
                const products = await Product.find().sort({ createdAt: 1 })
                return products
            } catch(err){
                throw new Error(err)
            }
        },
        async getProduct(_, { productId }){
            try{
                const product = await Product.findById(productId);
                if(product){
                    return product;
                } else {
                    throw new Error('Post not found')
                }
            } catch(err){
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createProduct(_, { body }, context){
            const user = checkAuth(context)
            console.log(user)

            const newProduct = new Product({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const product = await newProduct.save()

            return product
        },
        async deleteProduct(_, { productId }, context){
            const user = checkAuth(context)

            try{
                const product = await Product.findById(productId)

                if(user.username === product.username){
                    await product.delete()
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch(err){
                throw new Error(err)
            }
        }
    }
}