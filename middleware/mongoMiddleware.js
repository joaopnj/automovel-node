const mongoose = require('mongoose');

var MongoMiddleware = {
    connect: () => {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, (err) => {
            if (err) console.error('Erro ao conectar no mongodb ' + err);
        });
    },
    disconnect: () => {
        mongoose.disconnect();
    }
}

module.exports = MongoMiddleware;