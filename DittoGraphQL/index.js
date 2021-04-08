import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v4';
import passport from 'passport';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import { ApolloServer } from 'apollo-server-express';
import User from './packages/User';
import PaymentDetailsTypeDef from './packages/payments/paymentDetailsTypeDef.js';
import PaymentDetailsResolvers from './packages/payments/paymentDetailsResolvers.js';
import CustomerDetailsTypeDef from './packages/customer/customerDetailsTypeDef.js';
import CustomerDetailsResolvers from './packages/customer/customerDetailsResolvers.js';
import UserToken from './packages/UserToken.js';

var typeDefs = [PaymentDetailsTypeDef,CustomerDetailsTypeDef];
var resolvers = [PaymentDetailsResolvers,CustomerDetailsResolvers];
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