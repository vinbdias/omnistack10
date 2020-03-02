const axios = require('axios');

const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    index: async (req, res) => {

        try {
            const devs = await Dev.find();   
            
            return res.status(200).json(devs);
        } catch (error) {
            
            return res.status(500).json(error.message);
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
                    coordinates: [latitude, longitude]
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
        } catch (error) {
            return res.status(500).json(error.message);       
        }
    
    }    
};