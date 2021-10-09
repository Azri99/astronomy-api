const fetch = require('node-fetch');

const AstroModel = require('../model/astronomy');

const { NASA_URL } =  process.env;

const getDailyImage =  _ => {
    return new Promise( async (resolve, reject) => {
        try {
            let date = moment().subtract(1, 'days')
            .format('YYYY-MM-DD');
            let request = await fetch(`${NASA_URL}&date=${date}`);
            let respon = await request.json(); 
            resolve(respon);
        } catch (error) {
            reject(error);
        }
    });
}

const insertDailyImage = data => {
    return new Promise( async (resolve, reject) => {
        try {
            let save = await new AstroModel(data).save();
            resolve(save)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getDailyImage,
    insertDailyImage
}