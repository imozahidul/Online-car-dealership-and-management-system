
// request korar jonno axios using api
const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('home', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.login_page = (req, res) => {
    res.render('login');
    
}

exports.dashboard = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.about_page = (req, res) => {

    res.render('about');

}


exports.search_page = (req, res) => {

    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('search_page', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

}

exports.search = (req, res) => {
    // Make a get request to /api/users
    var query = req.body.search
    axios.post(`http://localhost:3000/api/search?search=${query}`)
        .then(function(response){
            res.render('search_page', { users : response.data.Cars});
        })
        .catch(err =>{
            res.send(err);
        })

    
}



exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}