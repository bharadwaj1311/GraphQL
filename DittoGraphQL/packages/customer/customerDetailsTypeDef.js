 

const typeDefinition = `
 extend type Query  {
    customer: Customer
 }
	type Customer {
        id: String!,
		customer_id : String,
        name: String!
        masterId: String
        price: Float!
        currency: String!
        longDescription: String!
        shortDescription: String!
    }



`

export default typeDefinition;