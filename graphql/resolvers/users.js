const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config')
const User = require('../../models/User') 
const { UserInputError } = require('apollo-server');

// Recebe os valores do input de login

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
    Mutation: {
        async login(_, { username, password }){
            const {errors, valid} = validateLoginInput(username, password)

            if(!valid){
                throw new UserInputError('Errors', { errors })
            }

            const user = await User.findOne({ username })

            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general = 'Wrong credentials'
                throw new UserInputError('Wrong credentials', { errors })
            }

            const token = generateToken(user)

            // A forma que eu quero enviar isso para o client
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(_, {registerInput: {
            username,
            email,
            password,
            confirmPassword
        }},){
            // Validade user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', { errors })
            }           

            // Make sure user doesnt already exist
            const user = await User.findOne({ username })
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            // Encrypta a senha
            password = await bcrypt.hash(password, 12)

            // Organiza as informações da maneira que queremos
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })

            // Salvamos em banco
            const res = await newUser.save()

            // Executa a função para gerar o token do usuário
            const token = generateToken(res)

            // A forma que eu quero enviar isso para o client
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}