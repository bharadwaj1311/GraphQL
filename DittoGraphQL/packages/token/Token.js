const fetch = require("make-fetch-happen");
var AppConstants = require('../../constants');
var Config = require('../../config');
import TokenModel from './TokenModel.js';


class Token{
	constructor(){
	}
	/**
	 * To get Guest Token...
	*/
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
			console.log("Token.getGuestToken:"+error);
			//as these two fields are mandatory.
			tokenResponseData.customer_id = "";
			tokenResponseData.auth_type="";
			tokenResponseData.success=false;
			tokenResponseData.error = "Token.getGuestToken:"+error.toString();
		}
		return tokenResponseData;
	}
	/**
	 * Logged in Token...
	*/
	async getLoggedInToken(args){
		var tokenModel = new TokenModel();
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
			tokenResponseData = tokenModel.getTokenAssoicatedData(customerDetails);
			if(tokenResponseData.success){
				tokenResponseData.token = customerTokenResp.headers.get('Authorization');
			}else{
				tokenResponseData.token = "";
			}	
		}catch (error) {
			console.log("Token.getLoggedInToken:"+error);
			//as these two fields are mandatory.
			tokenResponseData.customer_id = "";
			tokenResponseData.auth_type="";
			tokenResponseData.success=false;
			tokenResponseData.error="Token.getLoggedInToken:"+error.toString();
		}
		return tokenResponseData;
	}
	/**
	 * To Refresh Access Token...
	**/
	async refreshToken(args){
		var tokenModel = new TokenModel();
		var tokenResponseData = {};
		try {
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_AUTH+"?"+Config.SFCC_CLIENT_ID;
			var bodyData = { "type": "refresh"};
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization":"Bearer "+args.currentToken
			} 
			const refreshTokenResp = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(bodyData)});
			var refreshTokenJSON = await refreshTokenResp.json();
			 
			tokenResponseData = tokenModel.getTokenAssoicatedData(refreshTokenJSON);
			if(tokenResponseData.success){
				tokenResponseData.token = refreshTokenResp.headers.get('Authorization');
			}else{
				tokenResponseData.token = "";
			}
		}catch (error) {
			console.log("Token.refreshToken():"+error);
			//as these two fields are mandatory.
			tokenResponseData.customer_id = "";
			tokenResponseData.auth_type="";
			tokenResponseData.success=false;
			tokenResponseData.error = "Token.refreshToken():"+error.toString();
		}
		return tokenResponseData;
	}
	/**
	 * invalid Token...
	 */
	async invalidateToken(args){
		var tokenModel = new TokenModel();
		 
		try {
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_AUTH+"?"+Config.SFCC_CLIENT_ID;
			var bodyData = { "type": "refresh"};
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization":"Bearer "+args.currentToken
			} 
			const invalidateTokenResp = await fetch(url,{method:'delete',headers:authHeaders,body:JSON.stringify(bodyData)});
			
			return "Invalidated";
		}catch (error) {
			console.log("Token.invalidateToken:"+error);
			return "Failed to Invalidated "+error.toString();
		}
		return tokenResponseData;
	}
	/**
	 * oAuth Token...
	 */
	async oAuthToken(args){
		var tokenModel = new TokenModel();
		var tokenResponseData = {}; 
		try {
			const url = Config.SFCC_OAuth_URL+"?grant_type=client_credentials";
			var authHeaders = {
				"Content-Type":"application/x-www-form-urlencoded",
				"Authorization":"Basic "+args.encodeStr
			} 
			const authToken = await fetch(url,{method:'post',headers:authHeaders});
			var tokenJSON = await authToken.json();
			tokenResponseData = tokenModel.getTokenAssoicatedData(tokenJSON); 
		}catch (error) {
			console.log("Token.oAuthToken:"+error);
			tokenResponseData = {error_description:error.toString()}
			tokenResponseData; 
		}
		return tokenResponseData;
	}
	/**
	 * Environment oAuth Token....
	 */
	async envAuthToken(args){
		var tokenModel = new TokenModel();
		 
		try {
			const url = Config.SFCC_ENV_OAUTH_URL+"?"+Config.SFCC_CLIENT_ID+"&grant_type=urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken";
			var authHeaders = {
				"Content-Type":"application/x-www-form-urlencoded",
				"Authorization":"Basic "+args.encodeStr
			} 
			const authToken = await fetch(url,{method:'post',headers:authHeaders});
			var tokenJSON = await authToken.json();
			return tokenJSON;
		}catch (error) {
			console.log("Token.envAuthToken:"+error);
			var errorJSON = {error_description:error.toString()}
			return errorJSON; 
		}
	}
}

  
export default Token;