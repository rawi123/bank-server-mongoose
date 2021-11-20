const users = require("../models/User");
const getAllUsers = (req, res) => {
    users.find({}, (err, data) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(data)
    })
}


const getSingleUser = (req, res) => {//return the user if its found else return falsy value
    users.findById(req.params.id, (err, data) => {
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

const updateUser = (id, obj, changingActive = false) => {
    const data = getAllUsers();
    const user = data.find(user => user.passportID === Number(id));

    if (!changingActive && user && !user.isActive) {
        return "User inactive";
    }

    if (user) {
        for (const variable in obj) {
            if (variable !== "isActive" || changingActive)
                user[variable] = user[variable] !== undefined ? obj[variable] : undefined
        }

        updateAllUsers(data);
        return user;
    }

    else {
        return "User not found!";
    }
}

const deleteUser = (req, res) => {
    users.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) return res.status(404).json(err);
        res.status(200).json(data)
    })
}

const deposit = (req, res) => {
    users.findOne({ _id: req.params.id, isActive: true }, (err, data) => {
        if (data) {
            users.findByIdAndUpdate(req.params.id, { cash: Number(data.cash) + Number(req.body.ammount) }, { new: true }, (error, updatedData) => {
                if (error) return res.status(404).json(error)
                return res.status(200).json(updatedData)
            })
        }
        else return res.status(404).json(err)
    })
}

const withdraw = (req, res) => {
    users.findOne({ _id: req.params.id, isActive: true }, (err, data) => {
        if (err) return res.status(404).json(err)
        if (data.cash + data.credit < req.body.ammount) {
            return res.status(404).json("not enought money")
        }
        users.findOneAndUpdate({ _id: req.params.id, isActive: true }, { cash: Number(data.cash) - Number(req.body.ammount) }, { new: true }, (error, updatedData) => {
            if (error) return res.status(404).json(error)
            res.status(200).json(updatedData)
        })
    })
}

const transfer = async (req, res) => {
    let user1, user2;
    users.findOne({ _id: req.params.id1, isActive: true }, (err, data) => {
        if (err) return res.status(404).json(err)
        users.findOneAndUpdate({ _id: req.params.id1, isActive: true }, { cash: Number(data.cash) - Number(req.body.ammount) }, { new: true }, (error, updatedData) => {

            if (error) return res.status(404).json(error)
            user1 = updatedData;

            users.findOne({ _id: req.params.id2, isActive: true }, (err, data) => {

                if (err) return res.status(404).json(err)

                users.findByIdAndUpdate(req.params.id2, { cash: Number(data.cash) + Number(req.body.ammount) }, { new: true }, (error, updatedData) => {

                    if (error) return res.status(404).json(error)

                    user2 = updatedData;
                    res.status(200).json({
                        user1, user2
                    })
                })
            })
        })
    })



}


module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    addNewUser,
    deposit,
    withdraw,
    transfer
}