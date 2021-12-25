const { Router } = require('express');
const passport = require('passport');
const { fetchClothes, addCloth, deleteCloth, requestCloth } = require('../controllers/clothes.controller');
const clothesRouter = Router();

// User router for handling requests from clients
clothesRouter.get('/clothes', fetchClothes);
clothesRouter.post('/clothes', passport.authenticate('jwt', { session: false }) ,addCloth);
clothesRouter.put('/delete-clothes', passport.authenticate('jwt', { session: false }) ,deleteCloth);
clothesRouter.post('/request', passport.authenticate('jwt', { session: false }) ,requestCloth);

module.exports = clothesRouter;