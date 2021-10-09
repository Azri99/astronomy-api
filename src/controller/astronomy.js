const fetch = require('node-fetch');
const moment = require('moment');
const AstroModel = require('../model/astronomy');

const { NASA_URL } =  process.env;

const getDailyImageDb = _ => {
    return new Promise( async (resolve, reject) => {
        try {
            let date = moment().subtract(1, 'days').format('YYYY-MM-DD');
            let dailyImage = await AstroModel.findOne({ date }).exec(); 
            resolve( dailyImage ? ({date, hdurl, title} = dailyImage) : dailyImage);
        } catch (error) {
            reject(error);
        }
    });
}

const getDailyImage =  _ => {
    return new Promise( async (resolve, reject) => {
        try {
            let date = moment().subtract(1, 'days').format('YYYY-MM-DD');
            
            let request = await fetch(`${NASA_URL}&date=${date}`);
            let { hdurl, title } = await request.json(); 
            
            resolve({ date, hdurl, title });
        } catch (error) {
            reject(error);
        }
    });
}

const insertDailyImage = data => {
    return new Promise( async (resolve, reject) => {
        try {
            let save = await new AstroModel(data).save();
            resolve(save);
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getDailyImage,
    insertDailyImage,
    getDailyImageDb
}