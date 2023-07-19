const express = require('express');
const { loginLogic, registerLogic, googleOauth } = require('../controllers/authenticate');
const passport = require('passport');
require('../configs/googleOauth');

const patientRouter = express.Router();

patientRouter.post('/login', loginLogic('Patient'));

patientRouter.post('/register', registerLogic('Patient'));

patientRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

patientRouter.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}), googleOauth('Patient'));

module.exports = {
    patientRouter
};

