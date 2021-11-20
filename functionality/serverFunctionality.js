const users = require("../models/User");
const getAllUsers = (req, res) => {
    users.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(data)
    })
}


const getSingleUser = (req, res) => {//return the user if its found else return falsy value
    users.findOne({ passportID: req.params.id }, (err, data) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(data)
    });
}

const addNewUser = (req, res) => {
    const user = new users(req.body);
    user.save((err, data) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(data)
    })
}



const deleteUser = (req, res) => {
    users.findOneAndDelete({ passportID: req.params.id }, (err, data) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(data)
    })
}

const deposit = (req, res) => {
    users.findOne({ passportID: req.params.id, isActive: true }, (err, data) => {
        if (data) {
            users.findOneAndUpdate({ passportID: req.params.id }, { cash: Number(data.cash) + Number(req.body.ammount) }, { new: true }, (error, updatedData) => {
                if (error) return res.status(404).json(error)
                return res.status(200).json(updatedData)
            })
        }
        else return res.status(404).json(err)
    })
}

const withdraw = (req, res) => {
    users.findOne({ passportID: req.params.id, isActive: true }, (err, data) => {
        if (err) return res.status(404).json(err)
        if (data.cash + data.credit < req.body.ammount) {
            return res.status(404).json("not enought money")
        }
        users.findOneAndUpdate({ passportID: req.params.id }, { cash: Number(data.cash) - Number(req.body.ammount) }, { new: true }, (error, updatedData) => {
            if (error) return res.status(404).json(error)
            res.status(200).json(updatedData)
        })
    })
}

const transfer = async (req, res) => {
    let user1, user2;
    users.findOne({ passportID: req.params.id1, isActive: true }, (err, data) => {
        if (err) return res.status(404).json(err)
        users.findOneAndUpdate({ passportID: req.params.id1, isActive: true }, { cash: Number(data.cash) - Number(req.body.ammount) }, { new: true }, (error, updatedData) => {

            if (error) return res.status(404).json(error)
            user1 = updatedData;

            users.findOne({ passportID: req.params.id2, isActive: true }, (err, data) => {

                if (err) return res.status(404).json(err)

                users.findOneAndUpdate({ passportID: req.params.id2 }, { cash: Number(data.cash) + Number(req.body.ammount) }, { new: true }, (error, updatedData) => {

                    if (error) return res.status(404).json(error)

                    user2 = updatedData;
                    res.status(200).json({
                        sender:user1, 
                        reciver:user2
                    })
                })
            })
        })
    })



}


module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    addNewUser,
    deposit,
    withdraw,
    transfer
}