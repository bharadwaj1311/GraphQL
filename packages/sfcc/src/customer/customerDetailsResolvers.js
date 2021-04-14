

import Customer from './Customer.js';

const  resolverObject = {
	Query : {
		customer: () => 	new Customer().getCustomer(),
		loginUser: (data,args,context,info) =>  new Customer().registerLogin(context,args),
		logout: (data, args, context) => {context.logout(); return "LogOutSuccess"}
	},
	Mutation:{
		 
		
		createCustomer : (data, args, context) => new Customer().createUser(context,args)
	}
}

export default resolverObject;