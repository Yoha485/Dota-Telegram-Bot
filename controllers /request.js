const { bot } = require('./config/config');
const { allHeroes } = require('../service/herocheck');


bot.hears(hero, ctx => {
    let heroName = ctx.message_text.toLowerCase();
    if(!allHeroes.includes(heroName)){
        ctx.reply('No such hero');
    } else {

    }
});