const { AuthenticationError, UserInputError } = require('apollo-server')

const checkAuth = require('../../util/check-auth')
const Product = require('../../models/Product')

module.exports = {
    Mutation: {
        async createCategorie(_, { productId, body }, context){
            const { username } = checkAuth(context)

            if(body.trim() === ''){
                throw new UserInputError('Empty categorie', {
                    errors: {
                        body: 'Must have at least one categorie'
                    }
                })
            }

            const product = await Product.findById(productId)

            if(product){
                product.categories.unshift({
                    body,
                    createdAt: new Date().toISOString()
                })

                await product.save()
                return product
            } else throw new UserInputError('Post not found')
        },
        async deleteCategorie(_, { productId, categorieId }, context){
            const { username } = checkAuth(context) 

            const product = await Product.findById(productId)

            if(product){
                const categorieIndex = product.categories.findIndex((c) => c.id === categorieId)

                product.categories.splice(categorieIndex, 1)
                await product.save()
                return product
            } else {
                throw new UserInputError('Product not found')
            }
        }
    }
}