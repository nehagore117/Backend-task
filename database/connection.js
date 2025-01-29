const mongoose = require('mongoose')
const URL = 'mongodb://127.0.0.1:27017/student'
const con = mongoose.connect(URL)

if (con) {
    console.log('Db Connected!!!')
}
else {
    console.log('unable to connect with  db!!!')
}