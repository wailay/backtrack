
const { MongoError } = require('mongodb');

function errorHandler(err, req, res, next) {
    if (err instanceof MongoError) {
        res.status(503).json({
            status: 'MongoError',
            message: error.message
        });
    } else {
        res.status(500).send({
            status: "ERROR",
            message: err.message
        });
    }


}


module.exports = errorHandler;