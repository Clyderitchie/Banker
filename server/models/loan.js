const { Schema, model } = require('mongoose');

const LoanSchema = new Schema(
    {
        lineOfCredit: {
            type: String,
        },
        auto: {
            type: String
        },
        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            require: true,
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    });

const Loan = model('Loan', LoanSchema);

module.exports = Loan;