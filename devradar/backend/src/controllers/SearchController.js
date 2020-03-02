const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    index: async (req, res) => {
        const { latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);

        try {
            const devs = await Dev.find({
                techs: {
                    $in: techsArray,
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

            return res.status(200).json(devs);
        }
        catch(error) {
            return res.status(500).json(error.message);
        }                
    }
};