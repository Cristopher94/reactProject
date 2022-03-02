const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const resolvers = {
    Query: {
        getUser: () => {
            console.log("Obteniendo datos del usuario");
            return null;
        },
    },
    Mutation:{
        //User
        register: async (_,{user}) => {
            const newUser = user;
            newUser.email = newUser.email.toLowerCase();
            newUser.username = newUser.username.toLowerCase();

            const {email, username, password} = newUser;

            //Revisar email en uso
            const foundEmail = await User.findOne({email});
            if(foundEmail) throw new Error("El email ya esta en uso");

            //Revisar si el nombre de usuario esta en uso
            const foundUserName = await User.findOne({username});
            if(foundUserName) throw new Error("El nombre de usuario ya esta en uso");

            //Encriptrar password
            const salt = await bcryptjs.genSaltSync(10);
            newUser.password = await bcryptjs.hash(password, salt);

            try{
                const user = new User(newUser);
                user.save();
                return user;
            }catch(error){
                console.log(error)
            }

        }
    }
};

module.exports = resolvers;