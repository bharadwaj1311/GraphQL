 

const typeDefinition = `
 extend type Query  {
    customer: Customer
	
 },
 extend type Mutation{
	loginUser(email:String!,password:String!):Customer
 }
	type Customer {
        creation_date: String,
        enabled: String,
		email: String ,
        login : String,
		customer_no: String
        first_name: String,
		last_name: String,
		gender: String,
		last_login_time: String,
		last_modified : String,
		last_visit_time	 : String,
		previous_login_time: String,
		previous_visit_time : String,
		customer_id : String!,
		auth_type: String!,
		token : String!,
		error: String
    }



`

export default typeDefinition;