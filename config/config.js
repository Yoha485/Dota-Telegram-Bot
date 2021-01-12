require('dotenv').config();

let token = process.env.TOKEN;

const { Telegraf } = require('telegraf')

const bot = new Telegraf(token);

module.exports = { bot };