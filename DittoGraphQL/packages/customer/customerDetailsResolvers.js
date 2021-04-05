

var Customer = require('./Customer');

const  resolverObject = {
	Query : {
		customer: () => 	new Customer()
	},
	 
}

module.exports=resolverObject