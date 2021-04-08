import Customer from '../../packages/customer/Customer.js'; 

const typeDefinition = `
 extend type Query  {
    guestUser: Customer
	registeredUser(encodeStr : String!):Customer
 }
`

export default typeDefinition;