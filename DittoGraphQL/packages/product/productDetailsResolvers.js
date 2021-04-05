
var Product = require('./Product');
 


const  resolverObject = {
   Query : {
		product: () => 	new Product()
   }
     
}

module.exports=resolverObject