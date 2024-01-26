
const express = require('express');
const route = express.Router()
// render er function require 
const services = require('../services/render');
//  same as services
const controller = require('../controller/controller');

// @description Root route
// @method GET
route.get('/', services.homeRoutes);
/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

route.get('/about', services.about_page)
route.get('/dashboard', services.dashboard)
// search 
route.post('/search', services.search)
route.get('/search-page', services.search_page)

// validate login 
route.get('/login-page', services.login_page)
route.post('/login', controller.varify)

// api, data base e post get put r delete korbo 
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
// api for search
route.post('/api/search', controller.searchCars);

module.exports = route