const Sequelize = require('sequelize');
const db = require('./database_setup');

const FAQs = db.define('Faqs',
{
    Question: { type: Sequelize.STRING },
    Answer: { type: Sequelize.STRING },
});

module.exports = FAQs;