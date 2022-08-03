module.exports = app => {
    const tache = require("../controllers/tache.controller");
    var router = require("express").Router();
    //export file 
    router.get("/export/:filename", tache.exportData);
    //gets
    router.get("/all/", tache.findAll);
    router.get("/employe/:atelier", tache.findbyatelier);
    // find by date 
    router.get("/date/:year", tache.findbyYear);
    router.get("/date/getmonth/:year/:month/:day", tache.findbyMonth);
    router.get("/date/:year/:month/:day", tache.findbyDay);
    //deletes
    router.delete("/all/:id", tache.delete);
    //puts
    router.put("/all/:id", tache.update);
    

    app.use('/api/tache', router);
}