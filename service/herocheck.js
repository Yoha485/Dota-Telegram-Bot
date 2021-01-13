let axios = require('axios');

const getAllHeroes = async () => {
    let allHeroes = [];
    await axios.get('https://api.opendota.com/api/heroes').then(res => allHeroes = res.data.map(x => x.localized_name));
    return allHeroes;
}

module.exports = getAllHeroes;
