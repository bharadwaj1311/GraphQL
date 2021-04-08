

import Customer from './Customer.js';

const  resolverObject = {
	Query : {
		customer: () => 	new Customer().getCustomer()
	},
	 
}

export default resolverObject;