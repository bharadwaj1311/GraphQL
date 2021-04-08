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
import {UserToken,User} from './packages/UserToken.js';
 

var typeDefs = [paymentDetailsTypeDef,customerDetailsTypeDef,tokenDetailsTypeDef];
var resolvers = [paymentDetailsResolver,customerDetailsResolver,tokenDetailsResolver];


const PORT = 9000;
const SESSION_SECRECT = 'bad secret';
var Config = require('./config');

passport.use(
  new GraphQLLocalStrategy((user, pass, done) => {
		
		let AuthUser = function() {
		  return new UserToken().getLoggedInToken().then(response => { return response;})
		}
		 			
		AuthUser().then(response => {
			done(null, {customer: response.customer,token: response.AuthToken});
		})
    }),
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	var token = user.token;
	var customerID = user.customer.customer_id;
	var customer = user.customer;
	done(null, customer);
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

export async function getUserFromContext(context, refresh = false) {
	console.log("i wil call always ra ");
    let user = context.getUser();
    const token = user && !refresh ? user.token : '';
    if (!token) {
		const res = await context.authenticate('graphql-local', { token });
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