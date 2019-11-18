const productsResolvers = require('./products')
const usersResolvers = require('./users')
const categoriesResolvers = require('./categories')

module.exports = {
    Query: {
        ...productsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...productsResolvers.Mutation,
        ...categoriesResolvers.Mutation,
    },
    Subscription: {
        ...productsResolvers.Subscription
    }
}

// Esse arquivo controla a intelisense do painel do graphql