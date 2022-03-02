const mongoose = require("mongoose");
const {ApolloServer} = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
require("dotenv").config({path: ".env"});

console.log(process.env.BBDD)
/* mongoose.connect(
    process.env.BBDD,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err,res) => {
        console.log(err)
        if(err){
            console.log("Error de conexion");
        }else{
            console.log("Conexion correcta");
        }
    }
); */
mongoose.connect(process.env.BBDD,(err,res) => {
    console.log(err)
    if(err){
        console.log("Error de conexion");
    }else{
        server();
    }
});

//Levantantar servidor
function server(){
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers
    });

    serverApollo.listen().then(({url}) => {
        console.log(`Servidor On en ${url} `);
    })
}