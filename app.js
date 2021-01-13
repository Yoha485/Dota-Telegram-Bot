const { bot } = require('./config/config');
const getAllHeroes = require('./service/herocheck');
const cheerio = require('cheerio');
let axios = require('axios');
let hero = 'drow-ranger'

let bestVs = [];
let worstVs = [];
let allHeroes = [];

bot.on('text', ctx => {
    let heroName = ctx.message.text;
    getAllHeroes().then(res => {
        allHeroes = res;
        console.log(allHeroes);
        if(!allHeroes.includes(heroName)){
            ctx.reply('No such hero');
        } else {
            heroName = heroName.toLowerCase().split(' ');
            console.log(heroName);
            if(heroName.length > 1){
                heroName = heroName.join('-');
                console.log(heroName);
            } else {
                console.log(heroName);
                heroName = heroName[0];
            }
            axios.get(`https://www.dotabuff.com/heroes/${heroName}`, {
                headers: {
                    Referer: `https://www.dotabuff.com/heroes/${heroName}`,
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(function (response) {
                const $ = cheerio.load(response.data);
                let re = /[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+|[A-Za-z]+\s[A-Za-z]+|[A-Za-z]+-[A-Za-z]+|[A-Za-z]+/g
                const string = $('.col-8');
                const output = string.find('tbody').text().split(',');
                let count = 0;
                for(let i = 0; i < output.length; i++){
                    let match = output[i].match(re);
                    if(match !== null && allHeroes.includes(match[0])){
                        if(count < 10){
                            bestVs.push(match[0]);
                            count++;
                        } else {
                            worstVs.push(match[0]);
                        }
                    }
                }
                ctx.reply(bestVs);
            });
        }
    })
});

bot.launch();




