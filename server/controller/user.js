const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user,SECRET_KEY,expiresIn){
    const { id,name,email,username} = user;
    const payload = {
        id,
        name,
        email,
        username,
    };
    return jwt.sign(payload,SECRET_KEY,{expiresIn});
}

async function register(user) {
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

function getUser(){
    console.log("Obteniendo datos del usuario"); 
    return null;
}

async function login(user){
    const {email,password} = user;
    const userFound = await User.findOne({email: email.toLowerCase()});
    if(!userFound) throw new Error ("Error en el email o pass");
    const passwordSucess = await bcryptjs.compare(password, userFound.password);
    if(!passwordSucess) throw new Error ("Error en el email o pass");

    return {
        token: createToken(userFound,process.env.SECRET_KEY, "24h")
    };
}
module.exports = {
    register,
    getUser,
    login
}