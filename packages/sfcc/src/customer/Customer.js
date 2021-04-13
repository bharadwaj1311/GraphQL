const fetch = require("make-fetch-happen");
import CustomerModel from './CustomerModel.js';
import Token from '../token/Token.js';
const config = require('../../config/Config.js'); 
const SFCCAPIPath = require('../../config/SFCCAPIPath');

import {
    getUserFromContext,getSFCCErrorMSG
} from '../../../../index.js';


/**
 * Customer Class has below API's 
 *
 *	fetchCustomer
 *	registerLogin
 *	createUser
 */

class Customer{
	constructor(){
	}
	
	async fetchCustomer(context,args){
		var authHeaders = {
			"Content-Type":"application/json",
			"Authorization": args.token
		}
		try {
			const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_FETCH_API_PATh+args.customerID;
			const customerDataResp = await fetch(url,{method:'get',headers:authHeaders});
			var customerData =  await customerDataResp.json();
			var customerModel = new CustomerModel();
			var customerResponseData = customerModel.getCustomerAssoicatedData(customerData);
		}catch (error) {
			console.log("Customer.getCustomer()"+error);
			var customerResponseData = {};
			customerResponseData.error = {};
			customerResponseData.error.errorCode = "Customer.203";
			customerResponseData.error.errorMSG = getSFCCErrorMSG("Customer.203");
			customerResponseData.error.errorDescription = error.toString();
		}
		return customerResponseData;
	}
	/**
	 * Registered user / login flow
	*/
	registerLogin(context,args){
		var customerModel = new CustomerModel();
		try{
			let userContext = function() {
			  return getUserFromContext(context,args).then(response => { return context})
			}
			
			return userContext().then(async context => { 
				 
				var customerResponseData = customerModel.getCustomerAssoicatedData(context.getUser());
				
				if(customerResponseData.success){
					args.token = customerResponseData.token;
					args.customerID = customerResponseData.customer_id;
					customerResponseData = this.fetchCustomer(context,args);
				}
				return customerResponseData;
			});	
		}catch(error){
			console.log("Customer.registerLogin():"+error);
			var customerResponseData = {};
			customerResponseData.error={};
			customerResponseData.error.errorMSG = getSFCCErrorMSG("Customer.202");
			customerResponseData.error.errorCode = "Customer.202";
			customerResponseData.error.errorDescription = error.toString();
			return customerResponseData;
		}			
	}
	/**
	 * Create User 
	 */
	async createUser(context,args){
		var customerModel = new CustomerModel();
		var createdUserData = {};
		try {
			return new Token().getGuestToken().then(tokenData => this.createProfile(tokenData,context,args));
		}catch (error) {
			console.log("Customer.createUser():"+error);
			createdUserData.error = error.toString();
		}
		return createdUserData;
	}
	/**
	 * Create Profile 
	*/
	async createProfile(authToken,context,args){
		var createdUserData = {};
		
		try{
			var customerModel = new CustomerModel();
			if(authToken && authToken.token){
				var authHeaders = {
					"Content-Type":"application/json",
					"Authorization": authToken.token
				}
				var bodyData =  JSON.stringify(args.input);
				const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_API_PATh;
				const customerData = await fetch(url,{method:'post',headers:authHeaders,body:bodyData});
				if(customerData){
					var customerDataJSON =  await customerData.json();
					createdUserData = customerModel.getCustomerAssoicatedData(customerDataJSON);
					if(createdUserData && createdUserData.success){
						args.email = args.input.customer.login;
						args.password = args.input.password;
						createdUserData = this.registerLogin(context,args);
					} 
				}else{
					createdUserData.error={};
					createdUserData.error.errorMSG="Create User Failed : ";
				}
			}else{
				createdUserData.error={};
				createdUserData.error.errorDescription="For Creating user Needed Auth Token , could not create it";
				createdUserData.error.errorCode= "customer.203";
				createdUserData.error.errorMSG= getSFCCErrorMSG("Customer.203");
			}
		}catch(error){
			console.log("Customer.createProfile():"+error);
			createdUserData.error={};
			createdUserData.error.errorMSG = error.toString();
		}
		return createdUserData;
	}	
}
export default Customer;