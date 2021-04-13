const fetch = require("make-fetch-happen");
var SFCCAPIPath = require('../../config/SFCCAPIPath');

import TokenModel from './TokenModel.js';
import AppLogger from '../AppLogger.js';
const config = require('../../config/Config.js'); 

import {
    getSFCCErrorMSG
} from '../../../../index.js';

/**
 * 	This class is for to fetch Tokens for Guest, Logged in, Refresh, invalidated 
 *
 *	Method Name			-	Description.
 *	-----------------------------------------------
 *	getGuestToken		-	To fetch Guest Token
 *	getLoggedInToken	-	To fetch Registered User token		
 *	refreshToken		-	to refresh token	
 *	invalidateToken		-	to invalidate token
 *	oAuthToken			-	to get Bearer from account.demandware.com	
 *	envAuthToken		-	to get environment associated token. 
*/
class Token{
	constructor(){
	}
	/**
	 * To get Guest Token...
	*/
	async getGuestToken(){
		AppLogger.info("Token.getGuestToken(): in method"); 
		var tokenModel = new TokenModel();
		var tokenResponseData = {};
		try {
			const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_AUTH+"?"+SFCCAPIPath.SFCC_CLIENT_ID;
			 
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
			tokenResponseData.success=false;
			tokenResponseData.error = {};
			tokenResponseData.error.errorDescription = "Token.getGuestToken: Error is "+error.toString();
			tokenResponseData.error.errorMSG =  getSFCCErrorMSG("Token.101");
			tokenResponseData.error.errorCode = "Token.101";
		}
		return tokenResponseData;
	}
	/**
	 * Logged in Token...
	 *	args.encodeStr is a input value - base 64 encode (userID:password)
	*/
	async getLoggedInToken(args){
		var tokenModel = new TokenModel();
		var tokenResponseData = {};
		try {
			 
			const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_AUTH+"?"+SFCCAPIPath.SFCC_CLIENT_ID;
			var bodyData = { "type": "credentials"};
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization":"Basic "+args.encodeStr
			} 
			 
			const customerTokenResp = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(bodyData)});
			var customerDetails = await customerTokenResp.json();
			console.log("in token resp "+JSON.stringify(authHeaders));
			tokenResponseData = tokenModel.getTokenAssoicatedData(customerDetails);
			if(tokenResponseData.success){
				tokenResponseData.token = customerTokenResp.headers.get('Authorization');
			}else{
				tokenResponseData.token = "";
			}	
		}catch (error) {
			console.log("Token.getLoggedInToken:"+error);
			tokenResponseData.success=false;
			tokenResponseData.error = {};
			tokenResponseData.error.errorMSG = getSFCCErrorMSG("Token.102");
			tokenResponseData.error.errorCode = "Token.102";
			tokenResponseData.error.errorDescription = "Token.getLoggedInToken: Error is "+error.toString();
		}
		return tokenResponseData;
	}
	/**
	 * To Refresh Access Token...
	 * args.currentToken will be currently ongoing token.
	**/
	async refreshToken(args){
		var tokenModel = new TokenModel();
		var tokenResponseData = {};
		try {
			const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_AUTH+"?"+SFCCAPIPath.SFCC_CLIENT_ID;
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
			tokenResponseData.success=false;
			tokenResponseData.error = {};
			tokenResponseData.error.errorMSG = getSFCCErrorMSG("Token.103");
			tokenResponseData.error.errorCode = "Token.103";
			tokenResponseData.error.errorDescription = "Token.refreshToken: Error is "+error.toString();
		}
		return tokenResponseData;
	}
	/**
	 * invalid Token...
	 * args.currentToken will be currently ongoing token.
	 */
	async invalidateToken(args){
		var tokenModel = new TokenModel();
		 
		try {
			const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_AUTH+"?"+SFCCAPIPath.SFCC_CLIENT_ID;
			var bodyData = { "type": "refresh"};
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization":"Bearer "+args.currentToken
			} 
			const invalidateTokenResp = await fetch(url,{method:'delete',headers:authHeaders,body:JSON.stringify(bodyData)});
			
			return "Invalidated";
		}catch (error) {
			var tokenResponseData = {};
			tokenResponseData.error = {};
			tokenResponseData.error.errorMSG = getSFCCErrorMSG("Token.104");
			tokenResponseData.error.errorCode = "Token.104";
			tokenResponseData.error.errorDescription = "Token.invalidateToken: Error is "+error.toString();
		}
		return tokenResponseData;
	}
	/**
	 * oAuth Token...
	 *	args.encodeStr is a input value  base 64 encode value APIKey:APIPassword 
	 *
	 */
	async oAuthToken(args){
		var tokenModel = new TokenModel();
		var tokenResponseData = {}; 
		try {
			const url = SFCCAPIPath.SFCC_OAuth_URL+"?grant_type=client_credentials";
			var authHeaders = {
				"Content-Type":"application/x-www-form-urlencoded",
				"Authorization":"Basic "+args.encodeStr
			} 
			const authToken = await fetch(url,{method:'post',headers:authHeaders});
			var tokenJSON = await authToken.json();
			tokenResponseData = tokenModel.getTokenAssoicatedData(tokenJSON); 
		}catch (error) {
			console.log("Token.oAuthToken:"+error);
			var tokenResponseData = {};
			tokenResponseData.error = {};
			tokenResponseData.error.errorMSG = getSFCCErrorMSG("Token.105");
			tokenResponseData.error.errorCode = "Token.105";
			tokenResponseData.error.errorDescription = "Token.oAuthToken: Error is "+error.toString();
			
		}
		return tokenResponseData;
	}
	/**
	 * Environment oAuth Token....
	 *
	 * args.encodeStr  = its a input parameter shoul be BM user id : BM password: API Key password    with base 64 encode.
	 *
	 */
	async envAuthToken(args){
		var tokenModel = new TokenModel();
		 
		try {
			const url = SFCCAPIPath.SFCC_ENV_OAUTH_URL+"?"+SFCCAPIPath.SFCC_CLIENT_ID+"&grant_type=urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken";
			var authHeaders = {
				"Content-Type":"application/x-www-form-urlencoded",
				"Authorization":"Basic "+args.encodeStr
			} 
			console.log(" url is "+url);
			
			const authToken = await fetch(url,{method:'post',headers:authHeaders});
			var tokenJSON = await authToken.json();
			tokenResponseData = tokenModel.getTokenAssoicatedData(tokenJSON); 
		}catch (error) {
			console.log("Token.envAuthToken:"+error);
			var tokenResponseData = {};
			tokenResponseData.error = {};
			tokenResponseData.error.errorMSG = getSFCCErrorMSG("Token.106");
			tokenResponseData.error.errorCode = "Token.106";
			tokenResponseData.error.errorDescription = "Token.envAuthToken: Error is "+error.toString();
		}
		return tokenResponseData;
	}
}

  
export default Token;