const fetch = require("make-fetch-happen");
import CustomerModel from './CustomerModel.js';
import Token from '../token/Token.js';
const config = require('../../config/Config.js'); 
const SFCCAPIPath = require('../../config/SFCCAPIPath');

import {
    getUserFromContext
} from '../../../../index.js';


class Customer{
	constructor(){
	}
	
	async getCustomer(){
		var authHeaders = {
			"Content-Type":"application/json",
			"Authorization": "Bearer eyJfdiI6IjEiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdiI6IjEiLCJleHAiOjE2MTc2ODY2NDAsImlhdCI6MTYxNzY4NDg0MCwiaXNzIjoiNTJlYzc3MzAtYTEyMy00MDgxLTkwOTItYzMyNjk0MWNlNDRkIiwic3ViIjoie1wiX3ZcIjpcIjFcIixcImN1c3RvbWVyX2luZm9cIjp7XCJjdXN0b21lcl9pZFwiOlwiYmNkYkc3c2xDOW10aEtVakh4YTE4MEdPT0VcIixcImd1ZXN0XCI6ZmFsc2UsXCJ2aXNpdF9pZFwiOlwiMjM5NzA3MDg1MTRmYzQ0YTYzMWJkMGRiMGVcIn19In0.dl8XgldAVo8SGRDrrSAdnbD_tnRnfYwIrohjhsPW78JgTif2kukQqnB74RgKHRx6U5CTBee8ktTVwqnmtguRTwytmcrbk-tEEoJSUmlbu4WWp0WYdqxZc2XRsqbExzYASvBlEMxS0Y0axaGC4w70XJiz6gy37fIoF22p8GxeoCK4pCnPG9dbUo1EZO6eYtGK03NyskZdXN388FOOoxNgQoERrCsDll6jB5BWdV9bmP96Y2NpG_mOX_gOmYm_m7hJzKuY4zU90SGc-GYkbBKfRPK3GthTr0LNXVsknydirpsZDI1hlBjrCxNz689-ogulL1Pj3Zve88_OvaDSUp6H46kqlE9oH_Qp05W8b0eKqy5bK8KB8rhwE2aEdr54P4j93AKxCA1ThkkSq_6OsXroLf7dIstCSj8bbe-POGM6bXMl8zFpsh_Xt0v96PV6z6cnReNDyvxFXs8S4f8RzSrWXI7o_03Fd88F5Xgz5QTjBmx5kUVmAunO0h-ww-BHJWcfychO-z_fDj58guEpJ79C3BT2ISWBpwOAhALh0NigB0jPLw_l37GhH9s4hF6R1ubu"
		}
		try {
			const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_FETCH_API_PATh+"bcdbG7slC9mthKUjHxa180GOOE";
			const customerData = await fetch(url,{method:'get',headers:authHeaders});
			return await customerData.json();;
		}catch (error) {
			console.log("Customer.getCustomer()"+error);
		}
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
				console.log("in context return "+JSON.stringify(customerResponseData));
				return customerResponseData;
			});	
		}catch(error){
			console.log("Customer.registerLogin():"+error);
			var customerResponseData = {error : error.toString()};
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
					var createdUserData = customerModel.getCustomerAssoicatedData(customerDataJSON);
					if(createdUserData && createdUserData.success){
						args.email = args.input.customer.login;
						args.password = args.input.password;
						createdUserData = this.registerLogin(context,args);
					} 
				}else{
					createdUserData.error="Created User Failed at Service Call";
				}
			}else{
				createdUserData.error="For Creating user Needed Auth Token , could not create it";
			}
		}catch(error){
			console.log("Customer.createProfile():"+error);
		}
		return createdUserData;
	}
	
}
export default Customer;