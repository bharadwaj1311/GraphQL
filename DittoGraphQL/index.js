import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v4';
import passport from 'passport';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import { ApolloServer } from 'apollo-server-express';
 
import paymentDetailsTypeDef from './packages/payments/paymentDetailsTypeDef.js';
import paymentDetailsResolver from './packages/payments/paymentDetailsResolvers.js';
import customerDetailsTypeDef from './packages/customer/customerDetailsTypeDef.js';
import customerDetailsResolver from './packages/customer/customerDetailsResolvers.js';

import tokenDetailsResolver from './packages/token/TokenDetailsResolvers.js';
import tokenDetailsTypeDef from './packages/token/TokenDetailsTypeDef.js';
import Token from './packages/token/Token.js';
import  User  from './packages/token/Token.js';
 

var typeDefs = [paymentDetailsTypeDef,customerDetailsTypeDef,tokenDetailsTypeDef];
var resolvers = [paymentDetailsResolver,customerDetailsResolver,tokenDetailsResolver];


const PORT = 9000;
const SESSION_SECRECT = 'bad secret';
var Config = require('./config');

passport.use(new GraphQLLocalStrategy((userID,password, done) => {
		let AuthUser = function() {
			var encodeString =   Buffer.from(userID+":"+password).toString('base64');
			var args = {"encodeStr" : encodeString};	
			return new Token().getLoggedInToken(args).then(userData => { return userData;})
		}
		 			
		AuthUser().then(userData => {
			done(null, userData);
		})
    }),
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

const app = express();

app.use(session({
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
  cookie: {
	sameSite: 'strict',
	},
}));

app.use(passport.initialize());
app.use(passport.session());

export async function getUserFromContext(context,args, refresh = false) {
	let user = context.getUser();
    const token = user && !refresh ? user.token : '';
    if (!token) {
		var email = args.email;
		var password = args.password; 
		const res = await context.authenticate('graphql-local', { email, password });
        context.login(res.user);
    } 	
	return user;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User }) 
});

server.applyMiddleware({ app,path: '/api' });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});