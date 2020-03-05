const axios = require('axios');

const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');
const { handleError, ErrorHandler } = require('../helpers/error');

module.exports = {
    index: async (req, res) => {

        try {
            const devs = await Dev.find();   

            if(devs.length === 0)
                throw new ErrorHandler(404, 'Nenhum dev cadastrado');
            
            return res.status(200).json(devs);
        } catch (err) {            
            return handleError(err, res);
        }        
    },
    store: async (req, res) => {
        const { github_username, techs, latitude, longitude } = req.body;        
    
        try {

            let dev = await Dev.findOne({ github_username });            

            if(!dev) {                
                const techsArray = parseStringAsArray(techs);
    
                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                };       
                
                const resGitHub = await axios.get(`https://api.github.com/users/${github_username}`);                
    
                const { name = login, avatar_url, bio } = resGitHub.data;
        
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                });                
            }            

            return res.status(200).json(dev);
        } catch (err) {
            return handleError(err, res);
        }    
    }    
};