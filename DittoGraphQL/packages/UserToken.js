const fetch = require("make-fetch-happen"); 
var Config = require('../config');


class UserToken{
	constructor(){
	}
	async getGuestToken(){
		
		try {
			 
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_AUTH+"?"+Config.SFCC_CLIENT_ID;
			var bodyData = { "type": "guest"};
			var authHeaders = {
				"Content-Type":"application/json"
			} 
			const guestTokenResp = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(bodyData)});
			var customerDetails = await guestTokenResp.json();
			var token = guestTokenResp.headers.get('Authorization');
			
			var finalResponse = {
				customer_id : customerDetails.customer_id,
				AuthToken : token
 			}
			return finalResponse;
			  
		}catch (error) {
			console.log(error);
		}
	}
	async getLoggedInToken(){
		
		try {
			 
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_AUTH+"?"+Config.SFCC_CLIENT_ID;
			var bodyData = { "type": "credentials"};
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization":"Basic R2F5YXRyaU1hcjMwQGdtYWlsLmNvbTpCaGFyYXRAMTIz"
			} 
			const guestTokenResp = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(bodyData)});
			var customerDetails = await guestTokenResp.json();
			var token = guestTokenResp.headers.get('Authorization');
			
			var finalResponse = {
				customer : customerDetails,
				AuthToken : token
 			}
			return finalResponse;
			  
		}catch (error) {
			console.log(error);
		}
	}
}

export default UserToken;