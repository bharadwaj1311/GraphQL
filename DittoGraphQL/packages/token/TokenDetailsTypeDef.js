import Customer from '../../packages/customer/Customer.js'; 

const typeDefinition = `
 extend type Query  {
    guestUser: Customer
	registeredUser(encodeStr : String!):Customer,
	refreshToken(currentToken : String!):Customer,
	invalidateToken(currentToken : String!) :String
}
`

export default typeDefinition;