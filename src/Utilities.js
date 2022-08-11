const User = require('./models/User')
const moment = require('moment')
function userMessage(username, message) {
    return {
        username, 
        message,
        time: moment().format("h:mm a")
    }
}
module.exports = userMessage