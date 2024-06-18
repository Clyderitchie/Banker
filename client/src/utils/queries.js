import { gql } from '@apollo/client';

// Teller
export const QUERY_TELLER = gql`
query getTeller($tellerId: ID) {
  getTeller(tellerId: $tellerId) {
    username
    email
    locationId
  }
}
`;

export const QUERY_TELLERS = gql`
query getAllTellers {
  getAllTellers {
    _id
    username
    email
    locationId
  }
}
`;

// Client
export const QUERY_CLIENTS = gql`
query getAllClients {
  getAllClients {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
  }
}
`;

export const QUERY_CLIENT = gql`
query getClient($clientId: ID, $firstName: String, $lastName: String, $email: String, $address: String, $phoneNumber: String, $birthday: String, $tin: String) {
  getClient(clientId: $clientId, firstName: $firstName, lastName: $lastName, email: $email, address: $address, phoneNumber: $phoneNumber, birthday: $birthday, tin: $tin) {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
    birthday
    tin
    accounts {
      _id
      accountType
      balance
    }
    services {
      _id
      debitCard
      checks
      onlineBanking
      creditCard
    }
    loans {
      _id
      lineOfCredit
      auto
    }
  }
}
`;

export const QUERY_FIRSTNAME = gql`
query getClientByFirstName($firstName: String) {
  getClientByFirstName(firstName: $firstName ) {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
    birthday
    tin
    accounts {
      accountType
      balance
      _id
      clientId {
        _id
        firstName
        lastName
      }
    }
    services {
      debitCard
      checks
      onlineBanking
      creditCard
      _id
      clientId {
        _id
        firstName
        lastName
      }
    }
    loans {
      _id
      lineOfCredit
      auto
      clientId {
        _id
        firstName
        lastName
      }
    }
  }
}
`;

export const QUERY_TIN = gql`
query getClientByTin($tin: String) {
  getClientByTin(tin: $tin) {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
    birthday
    tin
    accounts {
      _id
      accountType
      balance
      clientId {
        _id
        firstName
        lastName
      }
    }
    services {
      _id
      debitCard
      checks
      onlineBanking
      creditCard
      clientId {
        _id
        firstName
        lastName
      }
    }
    loans {
      _id
      lineOfCredit
      auto
      clientId {
        _id
        firstName
        lastName
      }
    }
  }
}
`;

export const QUERY_LASTNAME = gql`
query getClientByLastName($lastName: String) {
  getClientByLastName(lastName: $lastName) {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
    birthday
    tin
    accounts {
      _id
      accountType
      balance
      clientId {
        _id
        firstName
        lastName
      }
    }
    services {
      _id
      debitCard
      checks
      onlineBanking
      creditCard
      clientId {
        _id
        firstName
        lastName
      }
    }
    loans {
      _id
      lineOfCredit
      auto
      clientId {
        _id
        firstName
        lastName
      }
    }
  }
}
`;