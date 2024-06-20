import { gql } from '@apollo/client';

// Login
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
  }
}`; 

// Client
export const CREATE_CLIENT = gql`
mutation createClient($firstName: String, $lastName: String, $email: String, $address: String, $phoneNumber: String) {
  createClient(firstName: $firstName, lastName: $lastName, email: $email, address: $address, phoneNumber: $phoneNumber) {
    _id
    firstName
    lastName
    email
    address
    phoneNumber
  }
}`;

export const DELETE_CLIENT = gql`
mutation deleteClient($clientId: ID!) {
  deleteClient(clientId: $clientId) {
    _id
    firstName
    lastName
  }
}
`;