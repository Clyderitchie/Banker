const { Schema, model } = require('mongoose');

// TODO
// Data to add to client Schema
// Date accounts where opened
// When client started banking with bank
// Security Questions


const ClientSchema = new Schema(
    {
        firstName: {
            type: String,
            unique: false,
            required: 'First name is required'
        },
        lastName: {
            type: String,
            unique: false,
            required: 'Last name is required'
        },
        email: {
            type: String,
            unique: true,
            required: 'Email is required for a new client',
            match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                'This is not a valid email']
        },
        address: {
            type: String,
            match: [/^[a-zA-Z0-9\s,'-]*$/, 'That is not a valid address']
        },
        phoneNumber: {
            type: String,
            // match: [/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/, 'That is not a valid phone number']
        },
        birthday: {
            type: String,
        },
        tin: {
            type: String
        },
        accounts: [{
            type: Schema.Types.ObjectId,
            ref: 'Account'
        }],
        services: [{
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }],
        loans: [{
            type: Schema.Types.ObjectId,
            ref: 'Loan'
        }]
    },
    {
        toJSON: {
            // virtuals: true
        },
        id: false,
        autoIndex: false
    }
);

const Client = model('Client', ClientSchema);

module.exports = Client;