const { Schema, model } = require('mongoose');

const ServiceSchema = new Schema (
    {
        debitCard: {
            type: String,
        },
        checks: {
            type: String,
        },
        onlineBanking: {
            type: String,
        },
        creditCard: {
            type: String,
        },
        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            require: true
        }
    }, 
    {
        toJSON:{
            getters: true
        },
        id: false,
    });

const Service = model('Service', ServiceSchema);

module.exports = Service;