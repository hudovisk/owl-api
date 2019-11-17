// Arquivo para organizas a tipagem das minhas tabelas do banco e inputs

const { gql }  = require('apollo-server');

module.exports = gql`
    type Product {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        categories: [Categorie]!
    }

    type Categorie{
        id: ID!
        body: String!
        createdAt: String!
    }

    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query{
        getProducts: [Product]
        getProduct(productId: ID!): Product
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        createProduct(body: String!): Product!
        deleteProduct(productId: ID!): String!
    }
`