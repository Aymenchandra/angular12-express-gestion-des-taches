const db = require("../models");
const User = db.user;
const Role = db.role;

exports.findAllEmploye = (req, res) => {

  User.find({},{})
    .then(data => {
      // res.send(data);
      // console.log(data[1].roles[0]);
      var resultat = []
      for (var i = 0; i < data.length; i++){
        var obj = data[i];
        if(obj.roles[0] == "62837a7924765b3a945c1af9")
        {
          // console.log(obj)
          resultat.push(obj)
        }
      }
      res.send(resultat);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employe."
      });
    });
};

exports.deleteOneCompte = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employe with id=${id}. Maybe Employe was not found!`
        });
      } else {
        res.send({
          message: "Employe was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employe with id=" + id
      });
    });
};

exports.updateCompte = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Employe was not found!`
        });
      } else res.send({ message: "Employe was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employe with id=" + id
      });
    });
};

exports.findOneCompte = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Employe with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employe with id=" + id });
    });
};

