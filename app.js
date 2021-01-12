const { bot } = require('./config/config');
let axios = require('axios');
let hero = 'io'
const cheerio = require('cheerio');
let allHeroes = [];
let bestVs = [];
let worstVs = [];

axios.get('https://api.opendota.com/api/heroes').then(res => allHeroes = res.data.map(x => x.localized_name));
axios.get(`https://www.dotabuff.com/heroes/${hero}`, {
    headers: {
        Referer: `https://www.dotabuff.com/heroes/${hero}`,
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
    console.log(bestVs);
    console.log(worstVs);
});
