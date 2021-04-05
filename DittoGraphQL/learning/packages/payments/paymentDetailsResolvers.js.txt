
var Payment = require('./Payment');
 


const  resolverObject = {
   Query : {
		payment: () => 	Payment.getPaymentDetails() 
   },
   Mutation : {
		createPaymentInstrument:(data,args,context,info) => { 
			return Payment.createPaymentDetails(args); 
		}
	}
}
module.exports=resolverObject