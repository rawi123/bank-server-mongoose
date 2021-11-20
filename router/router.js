const express = require("express");
const router = new express.Router();
const serverFunc = require("../functionality/serverFunctionality");

router.get("/", (req, res) => {//get all users
    serverFunc.getAllUsers(req, res)
})

router.get("/:id", (req, res) => {//get single user by id
    serverFunc.getSingleUser(req, res)
})

router.post("/", (req, res) => {//post new user
    serverFunc.addNewUser(req, res)
})

router.delete("/:id", (req, res) => {//delete a user
    serverFunc.deleteUser(req, res)
})


router.put("/credit/:id", (req, res) => {
    serverFunc.credit(req, res);
})

router.put("/active/:id", (req, res) => {
    if (typeof req.body.isActive !== "boolean") {
        return res.status(404).send("Invalid input");
    }
    updateSingleVar(req.params.id, { "isActive": req.body.isActive }, res, true)
})

router.put("/withdraw/:id", (req, res) => {
    serverFunc.withdraw(req, res);
})

router.put("/deposit/:id", (req, res) => {
    serverFunc.deposit(req, res)
})

router.put("/send/:id1/recive/:id2", (req, res) => {
    serverFunc.transfer(req,res)
})


module.exports = router;