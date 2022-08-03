const db = require("../models");
const render = require("xlsx");
const tache = db.tache;

// import data from excel

exports.exportData = (req, res) => {
  const filename = req.params.filename

  const file = render.readFile(`C:/Users/Dell/Desktop/${filename}`,{
      cellDates:true});
  const sheets = file.SheetNames;
  for (let i=0;i< sheets.length; i++){
      const sheetname = sheets[i];
      const sheetData = render.utils.sheet_to_json(file.Sheets[sheetname]);
      // console.log("data", sheetData);
      data = sheetData
  }
  
  if (data.length == 0) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
// add data to database
data.map(async function(record){
  record.date_planifiee?.setDate(record.date_planifiee?.getDate()+1)
  tache.create({
      date_planifiee : record.date_planifiee,
      atelier : record.atelier,
      code_fab : record.code_fab,
      produit : record.produit,
      })
  })
};



// find admin board planning
exports.findAll = (req, res) => {
    tache.find({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tache."
        });
      });
};
// find employe board planning by atelier
exports.findbyatelier = (req, res) => {
    const atelier = req.params.atelier.toUpperCase();
    tache.find({ $and: [ { atelier:atelier } , { type:null } ] })
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving tache."
     });
   });
};
// Delete by id 
exports.delete = (req, res) => {
    const id = req.params.id;
  
    tache.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete tache with id=${id}. Maybe tache was not found!`
          });
        } else {
          res.send({
            message: "tache was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete tache with id=" + id
        });
      });
  };

// Confirmer tâche
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    tache.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update tache with id=${id}. Maybe tache was not found!`
          });
        } else res.send({ message: "tache was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating tache with id=" + id
        });
      });
  };
  // find by year 
  exports.findbyYear = (req, res) => {
    
  // const date_realisee  = req.query.date_realisee ;
      // var condition = date_realisee  ? { date_realisee: { $gte : date_realisee } } : {};
      // PVC.find(condition)
      var year= req.params.year
      tache.find({ 
        //query today up to tonight
        // console.log(new Date(2022-1, 11, 31, 1, 0, 0, 0))
        // console.log(new Date(2022, 11, 31, 0, 59, 59))
        date_realise: {
            $gte: new Date(year, 0, 1, 1, 0, 0, 0), 
            $lt: new Date(year, 11, 32, 0, 59, 59)
        }
    })
        .then(data => {
          res.send(data);
          console.log(data.length);
          console.log(new Date(year, 0, 1, 1, 0, 0, 0));
          console.log(new Date(year, 11, 32, 0, 59, 59));
          // console.log(year);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tache."
          });
        });
  };
  

  // find by month 
  exports.findbyMonth = (req, res) => {
    var year= req.params.year
    var month= Number(req.params.month)-1
    var day= req.params.day
    tache.find({ 
      //query today up to tonight
      // console.log(new Date(year, month, day-day, 1, 0, 0, 0))
      // console.log(new Date(year, month, day, 0, 59, 59))
      date_realise: {
          $gte: new Date(year, month, day-day, 1, 0, 0, 0), 
          $lt: new Date(year, month, day, 0, 59, 59)
      }
  })
      .then(data => {
        res.send(data);
        console.log(data.length);
        // console.log(new Date(year, month, day-day, 1, 0, 0, 0))
        // console.log(new Date(year, month, day, 0, 59, 59))
      })
      .catch(err => {
        console.log(new Date(year, month, day-day, 1, 0, 0, 0))
        console.log(new Date(year, month, day, 0, 59, 59))
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tache."
        });
      });
  };
  
  // findbyday
  exports.findbyDay = (req, res) => {
    var year= req.params.year
    var month= Number(req.params.month)-1
    var day= Number(req.params.day)-1
    tache.find({  
      //query today up to tonight
      // console.log((new Date(2022 ,0 ,1 ,1 ,0 ,0 ,0))) 
      // console.log(new Date(2022, 0, 1, 24, 59, 59)) 
      date_realise: {
          $gte: new Date(year, month, day+1, 1, 0, 0, 0),
          $lt: new Date(year, month, day+1, 24, 59, 59)
      }
    })
      .then(data => {
        res.send(data);
        console.log(new Date(year, month, day+1, 1, 0, 0, 0))
        console.log( new Date(year, month, day+1, 24, 59, 59))
        console.log(data.length);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tache."
        });
      });
  };