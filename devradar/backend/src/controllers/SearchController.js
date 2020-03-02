const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

const { handleError, ErrorHandler } = require('../helpers/error');

module.exports = {

    index: async (req, res) => {
        const { latitude, longitude, techs } = req.query;        

        const techsArray = parseStringAsArray(techs);                

        try {
            const devs = await Dev.find({
                techs: {
                    $in: techsArray
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000
                    }
                }
            });    
            
            if(devs.length === 0) 
                throw new ErrorHandler(404, 'Nenhum dev encontrado');

            return res.status(200).json(devs);
        }
        catch(err) {
            return handleError(err, res);
        }                
    }
};