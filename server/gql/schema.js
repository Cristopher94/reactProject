const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id:ID,
        name:String,
        username:String,
        email:String,
        avatar:String,
        siteWeb:String,
        description:String,
        password:String,
        createAt:String
    }
    type Token {
        token:String
    }
    input UserInput {
        # las ! significa que es obligatorio
        name:String!
        username:String!
        email:String!
        password:String!
    }

    input LoginUser {
        # las ! significa que es obligatorio
        email:String!
        password:String!
    }
    type Query {
        #User
        getUser: User
    }

    type Mutation {
        #User
        register(user:UserInput): User
        login(user:LoginUser): Token
    }
`;
module.exports = typeDefs;