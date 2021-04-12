const fetch = require("make-fetch-happen");
var AppConstants = require('../../constants');
const config = require('../../config/SFCCAPIPath.js'); 
const SFCCAPIPath = require('../../config/SFCCAPIPath');

import {
    getUserFromContext
} from '../../../../index.js';

class Payment{
	constructor(){
	}
	async getPaymentDetails(context,args){
		 
		try {
			let token = function() {
			  return getUserFromContext(context,args).then(response => { return context})
			}
			var finalPayments = token().then(async context => {
				var authHeaders = {
					"Content-Type":"application/json",
					"Authorization": context.getUser().token
				}
				const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_FETCH_API_PATh+context.getUser().customer_id+SFCCAPIPath.SFCC_PAYMENT_API;
				
				const paymentData = await fetch(url,{method:'get',headers:authHeaders});
				var paym = await paymentData.json();
				return paym;
			})
			return finalPayments; 
			
		}catch (error) {
			console.log(error);
		}
		return "";
	}
	
	async createPaymentDetails(args){
	 
		try {
			 
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization": "Bearer eyJfdiI6IjEiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdiI6IjEiLCJleHAiOjE2MTc2ODU2MTYsImlhdCI6MTYxNzY4MzgxNiwiaXNzIjoiNTJlYzc3MzAtYTEyMy00MDgxLTkwOTItYzMyNjk0MWNlNDRkIiwic3ViIjoie1wiX3ZcIjpcIjFcIixcImN1c3RvbWVyX2luZm9cIjp7XCJjdXN0b21lcl9pZFwiOlwiYmNkYkc3c2xDOW10aEtVakh4YTE4MEdPT0VcIixcImd1ZXN0XCI6ZmFsc2UsXCJ2aXNpdF9pZFwiOlwiZTNiMjdmZjIxYjQ4MjgwOTQ0NTYyOTQ5ZDVcIn19In0.dl8XgldAVo8SGRDrrSAdnbD_tnRnfYwIrohjhsPW78JgTif2kukQqnB74RgKHRx6U5CTBee8ktTVwqnmtguRT3rkN12zA9pEt3iFrx2nVnMDBNL-vEbhJwrTkMNzpfdyuufEjk1OkrdgjFBos9kWxpiz6gy37fIoF22p8GxeoCK4pCnPG9dbUo1EZO6eYtGK03NyskZdXN388FOOoxNgQoERrCsDll6jB5BWdV9bmP96Y2NpG_mOX_gOmYm_m7hJzKuY4zU90SGc-GYkbBKfRPK3GthTr0LNXVsknydirpsZDI1hlBjrCxNz689-ogulL1Pj3Zve88_OvaDSUp6H46kqlE9oH_Qp05W8b0eKqy5bK8KB8rhwE2aEdr54P4j93AKxCA1ThkkSq_6OsXroLf7dIstCSj8bbe-POGM6bXOvqyyAwgPh-RY2MVMVap7mid8BPyqKY9aB9WsJ2H3WaLH5o3K2UYpFPAKDEsssbv3-98FpV8Q2CnVWv9kvn4J8FzlbVnySyUOBbY_5QSNi7NbtIrk0JtGZF0UMuOP8Qh6fxLXTPC4hfS-_51OTHbMz"
			}
			const url = config.SFCC_ENV_URL+SFCCAPIPath.SFCC_CUSTOMER_FETCH_API_PATh+"bcdbG7slC9mthKUjHxa180GOOE"+SFCCAPIPath.SFCC_PAYMENT_API;
			const paymentData = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(args.input)});
			return await paymentData.json();
		}catch (error) {
			console.log(error);
		}
	 
	}
}





export default Payment;

 