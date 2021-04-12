const typeDefinition = `
	extend type Query  {
		customer: Customer
	
	}
	extend type Mutation{
		loginUser(email:String!,password:String!):Customer,
		logout: Boolean,
		createCustomer(input:CustomerData!):Customer
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
		phone_mobile:String,
		customer_id : String,
		auth_type: String!,
		token : String!,
		error : CustomerError
    }
	input CustomerData {
		password: String ,
		customer: inputCustomerDetails
    }
	input inputCustomerDetails {
		email: String ,
        login : String,
		first_name: String,
		last_name: String,
		gender: String,
		phone_mobile:String	  
    }
	type CustomerError{
		errorMSG: String,
		errorCode : String
	}
`

export default typeDefinition;