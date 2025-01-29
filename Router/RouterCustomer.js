const express = require('express')
const cust = require('../model/customer')
const auth = require('../Middleware/authorization')
const router = express.Router()
// const multer = require('multer')



//get request

router.get('/', (req, res) => {
    res.send('Welcome to Rest API!!!!!!!!!')
})


//toen verified

router.get('/self', auth, async (req, res) => {
    res.send('TOKEN IS VERIFIDE.....!!!!!!!!!')
})

//Login

router.post('/customer/login', async (req, res) => {
    const CurrentCustomer = await cust.loginCheck(req.body.emailId, req.body.password)
    console.log(CurrentCustomer)
    if (!CurrentCustomer) {
        res.send('Invalid Email or Password......!!!!!!!!!!!!!')
    }
    const token = await CurrentCustomer.generateToken()
    res.send({ CurrentCustomer, token })
})

//customer add

router.post('/customer/add', async (req, res) => {
    console.log(req.body)
    const temp = new cust(req.body)
    try {
        const cust = await temp.save()
        console.log('After save-------' + cust)
        if (cust) {
            res.send(cust)
        }
    }
    catch (error) {
        res.send(error)
    }
})


//Customer delete

router.delete('/customer/removeOnecust', auth, async (req, res) => {
    const _id = req.Cust._id
    try {
        const removeOne = await cust.findOneAndDelete({ _id })
        console.log('Delete student is:' + removeOne)

        if (removeOne) {
            res.send(removeOne)
            console.log('Record Deleted' + _id)
        }
        else {
            res.send('Error Deleting student....!!!!')
        }
    }
    catch (error) {
        console.log(error)
    }
})

//Customer update

router.put('/customer/self', auth, async (req, res) => {
    const Updates = Object.keys(req.body)
    console.log('========' + Updates)

    for (let field of Updates) {
        console.log('------' + field)
        if (field === 'emailId' || field === 'password') {
            res.send('you can not update emailId or password..')
        }
    }
    Updates.forEach((Update) => req.Cust[Update] = req.body[Update])
    await req.Cust.save()

    res.send(req.Cust)
})





