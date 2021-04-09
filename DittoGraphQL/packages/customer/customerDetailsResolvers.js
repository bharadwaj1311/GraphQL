

import Customer from './Customer.js';

const  resolverObject = {
	Query : {
		customer: () => 	new Customer().getCustomer()
		
	},
	Mutation:{
		loginUser: (data,args,context,info) =>  new Customer().registerLogin(context,args)
	}
	 
}

export default resolverObject;