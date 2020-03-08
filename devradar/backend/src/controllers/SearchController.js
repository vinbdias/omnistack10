const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

const { handleError, ErrorHandler } = require('../helpers/error');

module.exports = {

    index: async (req, res) => {
        const { latitude, longitude, techs } = req.query;                                

        try {
            const techsArray = parseStringAsArray(techs);    

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
                        $maxDistance: 80000
                    }
                }
            });            

            return res.status(200).json(devs);
        }
        catch(err) {
            return handleError(err, res);
        }                
    }
};