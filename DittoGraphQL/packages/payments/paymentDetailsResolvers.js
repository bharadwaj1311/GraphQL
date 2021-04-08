
import Payment from './Payment.js';

 


const  resolverObject = {
   Query : {
		payment: (data,args,context,info) => new	Payment().getPaymentDetails(context) 
		 
   },
   Mutation : {
		createPaymentInstrument:(data,args,context,info) => { 
			return  new	Payment().createPaymentDetails(args); 
		}
	}
}
export default resolverObject;