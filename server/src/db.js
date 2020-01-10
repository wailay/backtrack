const mongoose = require('mongoose');

try{
mongoose.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
} catch(err){   
    throw new Error('MongoError');
}

module.exports = mongoose;