const usuarioController = require("../controller/user");
const resolvers = {
    Query: {
        getUser: () => usuarioController.getUser(),   
    },
    Mutation:{
        //User
        register: (_,{user}) => usuarioController.register(user),
        login: (_,{user}) => usuarioController.login(user)       
        
    }
};

module.exports = resolvers;