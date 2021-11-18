const fetch = require('node-fetch');
const moment = require('moment');
const AstroModel = require('../model/astronomy');

const { NASA_URL } =  process.env;

module.exports.getDailyImageDb = _ => {
    return new Promise( async (resolve, reject) => {
        try {
            let date = moment().subtract(1, 'days').format('YYYY-MM-DD');
            let dailyImage = await AstroModel.findOne({ date }).lean();
            if(!dailyImage)
                resolve(dailyImage);
            else{
                delete dailyImage._id;
                delete dailyImage.__v;
                dailyImage.date = date;
                resolve(dailyImage);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.getDailyImage =  _ => {
    return new Promise( async (resolve, reject) => {
        try {
            let date = moment().subtract(1, 'days').format('YYYY-MM-DD');
            
            let request = await fetch(`${NASA_URL}&date=${date}`);
            let { url, hdurl, title } = await request.json(); 
            hdurl = hdurl ? hdurl : url;
            resolve({ date, hdurl, title });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.insertDailyImage = data => {
    return new Promise( async (resolve, reject) => {
        try {
            let save = await AstroModel(data).save();
            resolve(save);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports.isLiked = data =>{
    return new Promise(async(resolve, reject)=>{
        try{

            let liked = await AstroModel.updateOne({
                hdurl: data.hdurl
            }, {
                isLiked: data.isLiked
            });
            
            resolve(liked);           
        }catch (error){
            reject(error);
        }
    })
}