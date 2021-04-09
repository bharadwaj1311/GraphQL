

import Token from '../../packages/token/Token.js';  

const  resolverObject = {
	Query : {
		guestUser: () => 	new Token().getGuestToken(),
		registeredUser: (data,args,context,info) => 	new Token().getLoggedInToken(args),
		refreshToken: (data,args,context,info) => 	new Token().refreshToken(args),
		invalidateToken: (data,args,context,info) => 	new Token().invalidateToken(args)
	},
	 
}

export default resolverObject;