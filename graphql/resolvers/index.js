const productsResolvers = require('./products')
const usersResolvers = require('./users')

module.exports = {
    Query: {
        ...productsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...productsResolvers.Mutation
    }
}