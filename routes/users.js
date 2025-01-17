const router = require("express").Router();

router.get("/", (req,res) =>{
    res.send("Auth User Route")
});

module.exports = router