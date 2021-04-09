const mongoose = require('mongoose');
async function connect(){
    mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    await db.once('open', function() {
        console.log('Banco Conectado');
    });
    return db
}

async function disconnect(){
    const db = mongoose.connection;
    db.close();
    db.on('error', console.error.bind(console, 'connection error:'));
    await db.once('close', function() {
        console.log('Banco Fechado');
    });
}

module.exports = { connect, disconnect }