const bodyParser = require('body-parser')
const merge = require('lodash')
const cors = require('cors')
const express = require('express')
const port = process.env.PORT||9000
const app = express()
 
app.use(bodyParser.json() , cors())


var customerTypeDefinition = require('./packages/customer/customerDetailsTypeDef'); 
var customerResolverObject = require('./packages/customer/customerDetailsResolvers');

var productTypeDefinition = require('./packages/product/productDetailsTypeDef'); 
var productResolverObject = require('./packages/product/productDetailsResolvers');

var paymentTypeDefinition = require('./packages/payments/paymentDetailsTypeDef'); 
var paymentResolverObject = require('./packages/payments/paymentDetailsResolvers');





const {makeExecutableSchema} = require('graphql-tools')


const schema = makeExecutableSchema({typeDefs:[customerTypeDefinition,productTypeDefinition,paymentTypeDefinition], 
									 resolvers:   [customerResolverObject,productResolverObject,paymentResolverObject]})

const {graphqlExpress,graphiqlExpress} = require('apollo-server-express')

app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
app.listen(port, () =>  console.log(`server is up and running ${port}`))