
 

const typeDefinition = `
 type Query  {
    product: Product
	
	
}

	type Product {
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

module.exports=typeDefinition