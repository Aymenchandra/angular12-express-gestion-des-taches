const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const nodemailer=require('nodemailer');
const JWT_SECRET='0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPMLKJHGFDSQWXCVBN' 
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    nom: req.body.nom,
    prenom: req.body.prenom,
    password: bcrypt.hashSync(req.body.password, 8),
    atelier:req.body.atelier,
    produits:0
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        atelier: user.atelier,
        roles: authorities,
        accessToken: token
      });
    });
};
exports.forgetpassword = (req, res) => {
      const email = req.body.email
      User.findOne({
        email: email
      })
        .populate("roles", "-__v")
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          } else {
              let mailTransporter=nodemailer.createTransport({
                service:"gmail",
                auth:{
                    user:"chandraaymen@gmail.com",
                    pass:"xjepjiytdzlrfvra"
              }
            })
            const secret=JWT_SECRET+user.password;
            const payload={
              email:user.email,
              id:user.id,
            };
            const mailtoken=jwt.sign(payload,secret,{expiresIn:'1m'});
            const link=`http://localhost:4200/response-reset/${user.id}/${mailtoken}`;
            let details={
              from:"chandraaymen@gmail.com",
              to:email,
              subject:"Reset password",
              html:`<a href='${link}'>Reset password</a>`
            }      
            mailTransporter.sendMail(details,(err) =>{
              if(err){
                res.status(500).send({ message: err });
              } else {
                res.send(user)
              }
            })
          }
        }) 
};
exports.linkresetpassword = (req, res) => {
  const{id,token}=req.params;
  
  User.findById(id)
    .then(user => {
      if (!user)
        res.status(404).send({ message: "Not found Employe with id " + id });
      else{
        const secret=JWT_SECRET+user.password;
        const payload=jwt.verify(token,secret)
        res.render('linkresetpassword',{email:user.email})
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employe with id=" + id });
    });
    
};

exports.resetpassword = (req, res) => {
  
  const{id,token}=req.params;
  const password = bcrypt.hashSync(req.body.password,8);
  User.findByIdAndUpdate(id, {"password":password}, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update!`
      });
    } else {
      res.send({ message: "Employe was updated successfully." });
      const secret=JWT_SECRET+data.password;
      const payload=jwt.verify(token,secret)
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Cannot update !"
    });
  });
};

