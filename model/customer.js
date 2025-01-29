const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const custSchema = mongoose.Schema({
    cid:
    {
        type: String,
        required: true

    },

    FirstName:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new error('Only Alphabets Allowed!!!!')
            }
        }
    },

    LastName:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new error('Only Alphabets Allowed!!!!')
            }
        }
    },

    address:
    {
        type: String,
        required: true,
    },

    city:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new error('Only Alphabets Allowed!!!!')
            }
        }

    },

    state:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new error('Only Alphabets Allowed!!!!')
            }
        }
    },

    country:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlpha(value)) {
                throw new error('Only Alphabets Allowed!!!!')
            }
        }
    },

    emailId:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error('Please enter valid email id!!!!')
            }
        }

    },

    contactNo: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isNumeric(value)) {
                throw new error('only  number are allowed')
            }
        }

    },

    password: {
        type: String,
        required: true

    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],



},

)

custSchema.virtual('tasks', {
    ref: 'customers',
    localField: '_id',
    foreignField: 'owner'
})

//password matched

custSchema.pre('save', async function (next) {
    const tempCust = this

    if (tempCust.isModified('password')) {
        tempCust.password = await bcrypt.hash(tempCust.password, 10)
    }

    next()
})


//login check

custSchema.statics.loginCheck = async function (emailId, password) {
    const loginCustomer = await this.findOne({ emailId })
    //console.log(loginCustomer)

    if (!loginCustomer) {
        //  return null
        throw new Error('Invalid Email id....!!!!!!')

    }
    console.log(await bcrypt.compare(password, loginCustomer.password))

    const isMatch = await bcrypt.compare(password, loginCustomer.password)

    if (!isMatch) {
        // return loginCustomer
        throw new Error('invalid password')
    }
    return loginCustomer
}

custSchema.methods.generateToken = async function () {
    const Cust = this
    const id = Cust._id.toString()
    const token = jwt.sign({ _id: id }, 'Neha')
    console.log('The Token is' + token)
    Cust.tokens = await Cust.tokens.concat({ token })
    await Cust.save()
    console.log(Cust)
    return token
}


const customer = mongoose.model('customer', custSchema)

module.exports = customer;