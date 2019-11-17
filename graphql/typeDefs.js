// Arquivo para organizas a tipagem das minhas tabelas do banco e inputs

const { gql }  = require('apollo-server');

module.exports = gql`
    type Product {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
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
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
`