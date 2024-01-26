var Userdb = require('../model/model');
const multer = require('multer')
// multer add image
const storage = multer.diskStorage({
    // destination:(req, file, cb) => {
    //     cb(null, 'Image')
    // },
    destination: 'uploads',

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname)
    }


})

const upload = multer({ storage: storage }).single('image')

// create and save new user

exports.create = (req, res) => {

    // validate request

    upload(req, res, (err) => {

        if (err) {
            console.log(err)
        }
        else {

            if (!req.body) {
                res.status(400).send({ message: "Content can not be empty!" });
                return;
            }

            // new user
            const user = new Userdb({
                image: req.file.filename,
                brand: req.body.brand,
                model: req.body.model,
                color: req.body.color,
                price: req.body.price,
                type: req.body.type,
                status: req.body.status
            })

            //save user in the database
            user
                .save(user)
                .then(data => {
                    //res.send(data)
                    res.redirect('/add-user')
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some errore has uccurred while creating a create oprtation"
                    });
                });

        }

    })


}

// retrive and return all user / retrive or return a songle user

exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id })
            })

    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }

}

// search

exports.searchCars = async (req, res) => {

    var query = req.query.search
    var searchedcars = await Userdb.find(

        {
            // j kono fiels er upor query korbo
            $or: [
                // case in sensetice search i
                { brand: { $regex: ".*" + query + ".*", $options: 'i' } },
                { model: { $regex: ".*" + query + ".*", $options: 'i' } },
                { type: { $regex: ".*" + query + ".*", $options: 'i' } },
                { color: { $regex: ".*" + query + ".*", $options: 'i' } }
            ]
        }
    )

    res.send({ Cars: searchedcars })
}

// varify login
var author = [
    {
        u1: "admin",
        p1: "mozahid558907"
    }

]
exports.varify = (req, res) => {
    var user_n = req.body.user_name;
    var password = req.body.password;
    if (user_n === author[0].u1 && password === author[0].p1) {
        res.redirect('/dashboard');
    }

    else {

        

        //res.redirect('/login-page')
        res.redirect('/login-page')

        

    }

}

//update an user by id

exports.update = (req, res) => {


    upload(req, res, (err) => {

        if (err) {
            console.log(err)
        }
        else {

            if (!req.body) {
                return res
                    .status(400)
                    .send({ message: "Data to update can not be empty" })
            }

            const id = req.params.id;
            Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                .then(data => {
                    if (!data) {
                        res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
                    } else {
                        res.send(data)
                    }
                })
                .catch(err => {
                    res.status(500).send({ message: "Error Update user information" })
                })
        }

    })
}



// delete user by id

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

}