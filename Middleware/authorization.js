const jwt = require('jsonwebtoken')
const cust = require('../model/customer')


const auth = async function (req, res, next) {
    const loginToken = req.header('Authorization').replace('Bearer ', '')
    console.log(loginToken)

    const verifyde = jwt.verify(loginToken, 'Neha')
    console.log('Authenticate Token:' + verifyde)

    const findToken = await cust.findOne({ _id: verifyde._id, 'tokens.token': loginToken })
    console.log('Authenticate Customer' + findToken)
    req.Cust = findToken
    req.token = loginToken
    console.log('After setting Request Customer' + req.Cust)
    next()

};

module.exports = auth;