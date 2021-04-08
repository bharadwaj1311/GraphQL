const fetch = require("make-fetch-happen");
var AppConstants = require('../../constants');
var Config = require('../../config');
import TokenModel from './TokenModel.js';


class Token{
	constructor(){
	}
	
	async getGuestToken(){
		var tokenModel = new TokenModel();
		var tokenResponseData = {};
		try {
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_AUTH+"?"+Config.SFCC_CLIENT_ID;
			var bodyData = { "type": "guest"};
			var authHeaders = {
				"Content-Type":"application/json"
			} 
			const guestTokenResp = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(bodyData)});
			var customerDetails = await guestTokenResp.json();
			tokenResponseData = tokenModel.getTokenAssoicatedData(customerDetails);
			if(tokenResponseData.success){
				tokenResponseData.token = guestTokenResp.headers.get('Authorization');
			}else{
				tokenResponseData.token = "";
			}
		}catch (error) {
			console.log(error);
			//as these two fields are mandatory.
			tokenResponseData.customer_id = "";
			tokenResponseData.auth_type="";
			tokenResponseData.success=false;
			tokenResponseData.error = error.toString();
		}
		return tokenResponseData;
	}
	
	async getLoggedInToken(args){
		var tokenResponseData = {};
		try {
			 
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_AUTH+"?"+Config.SFCC_CLIENT_ID;
			var bodyData = { "type": "credentials"};
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization":"Basic "+args.encodeStr
			} 
			 
			const customerTokenResp = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(bodyData)});
			var customerDetails = await customerTokenResp.json();
			var token = customerTokenResp.headers.get('Authorization');
			tokenResponseData = new TokenModel().getTokenAssoicatedData(customerDetails);
			tokenResponseData.token = token;  
		}catch (error) {
			console.log(error);
			//as these two fields are mandatory.
			tokenResponseData.customer_id = "";
			tokenResponseData.auth_type="";
			tokenResponseData.success=false;
			tokenResponseData.error=error.toString();
		}
		return tokenResponseData;
	}
}

  
export default Token;