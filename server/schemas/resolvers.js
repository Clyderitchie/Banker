const { AuthenticationError, signToken } = require('../utils/auth');

const { Teller, Client, Account, Service, Loan } = require('../models');

module.exports = {
    Query: {
        getAllTellers: async () => {
            return await Teller.find({});
        },
        getTeller: async (_, args) => {
            return await Teller.findById(args.tellerId);
        },
        getAllClients: async () => {
            return await Client.find({});
        },
        getClientByFirstName: async (_, args) => {
            return await Client.find({ firstName: args.firstName }).populate('accounts');
        },
        getClientByLastName: async (_, args) => {
            return await Client.find({ lastName: args.lastName }).populate('accounts');
        },
        getClientByTin: async (_, args) => {
            return await Client.find({ tin: args.tin }).populate('accounts');
        },
        getClient: async (_, args) => {
            const { searchInput } = args;

            try {
                // Find clients whose firstName or lastName matches the searchInput
                const clients = await Client.find({
                    $or: [
                        { firstName: { $regex: new RegExp(searchInput, "i") } },
                        { lastName: { $regex: new RegExp(searchInput, "i") } }
                    ]
                })
                    .populate('accounts')
                    .populate('services')
                    .populate('loans');

                console.log("Clients: ", clients);
                return clients;
            } catch (error) {
                throw new Error('Failed to fetch clients');
            }
        },
        // getClient: async (_, args) => {
        //     const { clientId, firstName, lastName, email, address, phoneNumber, tin } = args;

        //     const filter = {};
        //     if (clientId) filter._id = clientId;
        //     if (firstName) filter.firstName = firstName;
        //     if (lastName) filter.lastName = lastName;
        //     if (email) filter.email = email;
        //     if (address) filter.address = address;
        //     if (phoneNumber) filter.phoneNumber = phoneNumber;
        //     if (tin) filter.tin = tin;
        //     try {
        //         // Find clients based on the filter object
        //         const clients = await Client.find(filter)
        //             .populate('accounts')
        //             .populate('services')
        //             .populate('loans')
        //         console.log("Clients: ", clients);
        //         return clients;
        //     } catch (error) {
        //         throw new Error('Failed to fetch clients');
        //     }

        // },
        getAllAccounts: async () => {
            return await Account.find({});
        },
        getAccount: async (_, args) => {
            return await Account.findById(args.accountId).populate("clientId");
        },

    },
    Mutation: {
        createTeller: async (_, args) => {
            const teller = await Teller.create(args);
            const token = signToken(teller);

            return { token, teller };
        },
        login: async (_, { username, password }) => {
            const teller = await Teller.findOne({ username });

            if (!teller) {
                throw AuthenticationError;
            }

            const correctPw = await teller.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(teller);

            return { token, teller };
        },
        createClient: async (_, args) => {
            const client = await Client.create(args);
            return client;
        },
        deleteClient: async (_, { clientId }) => {
            try {
                // Find the client by ID and delete it
                const deletedClient = await Client.findByIdAndDelete(clientId);
                if (!deletedClient) {
                    throw new Error('Client not found');
                }
                return deletedClient;
            } catch (error) {
                throw new Error(`Error deleting client: ${error.message}`);
            }
        },
        createAccount: async (_, args) => {
            const acct = await Account.create(args);
            await Client.findOneAndUpdate({ _id: args.clientId }, { $push: { accounts: acct._id } }, { new: true })
            return acct.populate("clientId")
        },
        createService: async (_, args) => {
            const serv = await Service.create(args);
            await Client.findByIdAndUpdate({ _id: args.clientId }, { $push: { services: serv._id } }, { new: true })
            return serv.populate('clientId')
        },
        createLoan: async (_, args) => {
            const loan = await Loan.create(args);
            await Client.findByIdAndUpdate({ _id: args.clientId }, { $push: { loans: loan._id } }, { new: true })
            return loan.populate('clientId');
        }
    }
};