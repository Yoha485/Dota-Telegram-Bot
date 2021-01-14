const { bot } = require('./config/config');
const getAllHeroes = require('./service/herocheck');
const cheerio = require('cheerio');
let axios = require('axios');

let bestVs = [];
let worstVs = [];
let allHeroes = [];

bot.on('text', ctx => {
    let heroName = ctx.message.text;
    getAllHeroes().then(res => {
        allHeroes = res;
        lowerCaseAllHeroes = allHeroes.map(x => x.toLowerCase());
        if(!lowerCaseAllHeroes.includes(heroName.toLowerCase())){
            ctx.reply('No such hero');
        } else {
            heroName = heroName.toLowerCase().split(' ');
            if(heroName.length > 1){
                heroName = heroName.join('-');
            } else {
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
                bestVsString = `🔥Your hero is great against:\n
                ${bestVs[0]}\n
                ${bestVs[1]}\n
                ${bestVs[2]}\n
                ${bestVs[3]}\n
                ${bestVs[4]}\n\n`

                worstVsString = `💩Your hero is bad against:\n
                ${worstVs[0]}\n
                ${worstVs[1]}\n
                ${worstVs[2]}\n
                ${worstVs[3]}\n
                ${worstVs[4]}\n`

                ctx.reply(bestVsString + worstVsString);
                bestVs = [];
                worstVs = [];
            });
        }
    })
});

bot.launch();




