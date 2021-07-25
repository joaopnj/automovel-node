const mongoose = require('mongoose');

var MongoMiddleware = {
    connect: () => {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true }, (err) => {
            if(err) console.error('Erro ao conectar no mongodb '+ err);
        });
    }
}

module.exports = MongoMiddleware;