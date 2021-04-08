

import Token from '../../packages/token/Token.js';  

const  resolverObject = {
	Query : {
		guestUser: () => 	new Token().getGuestToken(),
		registeredUser: (data,args,context,info) => 	new Token().getLoggedInToken(args)
	},
	 
}

export default resolverObject;