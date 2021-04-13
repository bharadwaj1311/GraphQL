

import Token from './Token.js';  

const  resolverObject = {
	Query : {
		guestUser: () => 	new Token().getGuestToken(),
		registeredUser: (data,args,context,info) => 	new Token().getLoggedInToken(args),
		refreshToken: (data,args,context,info) => 	new Token().refreshToken(args),
		invalidateToken: (data,args,context,info) => 	new Token().invalidateToken(args),
		oAuthToken : (data,args,context,info) => 	new Token().oAuthToken(args),
		envAuthToken : (data,args,context,info) => 	new Token().envAuthToken(args)
		 
	}
	 
}

export default resolverObject;