// const {QueryTypes} = require('sequelize');
const jwt = require('jsonwebtoken');
const Menu = require('../../models/user/menu');
const sequelize = require('../../util/database');
const {v4 : uuidv4} = require('uuid');
const crypto = require('crypto');

//Models
const User = require('../../models/user/user');
const Customer = require('../../models/user/customer');
const { stat, access } = require('fs');


//API's
exports.postCreateUser = (req, res, next) => {
    console.log("API postCreateUser HIT");
    console.log("req.body ==>", req.body);
    console.log("req.body.name ==>", req.body.name);
    console.log("req.headers ==>", req.headers);
    console.log("req.data ==>", req.data);
    const user_id = uuidv4();
    const name = req.body.name;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const age = req.body.age;
    const restaurant_name = req.body.restaurant_name;
    const password = req.body.password;
    const status = 'InActive';
    const token = ''
    // const hashed_password = crypto.createHash("sha256")
    // console.log("User_id ===> ", user_id);
    // console.log("name ===> ", req.body);
    User.create({
        user_id : user_id,
        name : name,
        email : email,
        phone_number : phone_number, 
        age : age,
        restaurant_name : restaurant_name,
        password : password,
        status : status,
        token : token
    }).then(result => {
        return res.json({message : "Registration was succefully done"});
    }).catch(err => {
        return res.json({message : "Registration was unsuccefull"});
    }); 
};

exports.getDeleteUser = (req, res, next) => {
    console.log("API postDeleteUser HIT");
    return res.json({hello : "hi"});
};

exports.postUpdateUser = (req, res, next) => {
    console.log("API postDeleteUser HIT");
    return res.json({hello : "hi"});
};

exports.getReadUser = (req, res, next) => {
    console.log("API getReadUser HIT");
    jwt.verify(req.token, 'accesskey', (err, authData) => {
        if(err){
            return res.sendStatus(403);
        }else{
            return res.json({
                message : "Welcome",
                authData
            });
        }
    });  
};

exports.logout = (req,res,next) => {
    console.log("/logout Api hitted");
    // const email = req.body.email;
    // refreshTokens = refreshTokens.filter(token => token !== req.body['token']);
    User.update({
        token: null,
        status: "InActive"
      }, {
        where: {
          token: req.body['token']
        }
    });
    // return res.json({message : "Logged out"});
    return res.sendStatus(204);
        
}

exports.postLogin = (req, res, next) => {
    console.log("Post Login Hit");
    const email = req.body['email'];
    const password = req.body['password'];
    console.log(email);
    console.log(password);
    User.findOne({
        where : {
            email : email,
            password : password
        }
    }).then(result => {
        if(result == null) return res.json({message : "wrong credentials"})
        // console.log(result);
        // const email = result.dataValues['email'];
        // console.log(email);
        console.log(email)
        const accessToken = generateToken(email);
        // const refreshToken = jwt.sign(email, 'refreshkey');

        //Query
        User.update({
            token: accessToken,
            status: "Active"
          }, {
            where: {
              email: email
            }
        });
        // return res.json("nbk");
        // return res.json({accessToken : accessToken, refreshToken : refreshToken});
        return res.json({accessToken : accessToken});
    }).catch(err => {
        return res.json({message : "login credentials didn't match"});
    });
}

// let refreshTokens = [];
exports.postRefreshToken = (req,res, next) => {
    console.log("Post token hit");
    const refreshToken = req.headers['token'];
    console.log("refreshToken ===> ",refreshToken);
    
    //Query
    User.findOne({where : {token : refreshToken}})
    .then(result => {
        if(result == null){
            return res.json({message : "Already Logged out"})
        }
        else{
            jwt.verify(refreshToken, 'refreshkey', (err, user_id) => {
                if(err) return res.sendStatus(403);
                console.log("user_id in postrefresh token is ==> ", user_id);
                const accessToken = generateToken(user_id);
                return res.json({accessToken : accessToken});
            })
        }
    }).catch(err => {
        console.log("something terrible happened while generating token");
        return res.sendStatus(403);
    })
}

//Functions
const generateToken = (userid) => {
    return jwt.sign({userid : userid}, 'accesskey',  {expiresIn : '7d'});
}



//Testing Api for development purpose
exports.getAllUser = (req, res, next) => {
    console.log("Get All users API hit")
    User.findAll().then(result => {
        return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching users"});
    });
}