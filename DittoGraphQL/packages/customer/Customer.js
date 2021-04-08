const fetch = require("make-fetch-happen");
var AppConstants = require('../../constants');
var Config = require('../../config');



class Customer{
	constructor(){
	}
	
	async getCustomer(){
		var authHeaders = {
			"Content-Type":"application/json",
			"Authorization": "Bearer eyJfdiI6IjEiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdiI6IjEiLCJleHAiOjE2MTc2ODY2NDAsImlhdCI6MTYxNzY4NDg0MCwiaXNzIjoiNTJlYzc3MzAtYTEyMy00MDgxLTkwOTItYzMyNjk0MWNlNDRkIiwic3ViIjoie1wiX3ZcIjpcIjFcIixcImN1c3RvbWVyX2luZm9cIjp7XCJjdXN0b21lcl9pZFwiOlwiYmNkYkc3c2xDOW10aEtVakh4YTE4MEdPT0VcIixcImd1ZXN0XCI6ZmFsc2UsXCJ2aXNpdF9pZFwiOlwiMjM5NzA3MDg1MTRmYzQ0YTYzMWJkMGRiMGVcIn19In0.dl8XgldAVo8SGRDrrSAdnbD_tnRnfYwIrohjhsPW78JgTif2kukQqnB74RgKHRx6U5CTBee8ktTVwqnmtguRTwytmcrbk-tEEoJSUmlbu4WWp0WYdqxZc2XRsqbExzYASvBlEMxS0Y0axaGC4w70XJiz6gy37fIoF22p8GxeoCK4pCnPG9dbUo1EZO6eYtGK03NyskZdXN388FOOoxNgQoERrCsDll6jB5BWdV9bmP96Y2NpG_mOX_gOmYm_m7hJzKuY4zU90SGc-GYkbBKfRPK3GthTr0LNXVsknydirpsZDI1hlBjrCxNz689-ogulL1Pj3Zve88_OvaDSUp6H46kqlE9oH_Qp05W8b0eKqy5bK8KB8rhwE2aEdr54P4j93AKxCA1ThkkSq_6OsXroLf7dIstCSj8bbe-POGM6bXMl8zFpsh_Xt0v96PV6z6cnReNDyvxFXs8S4f8RzSrWXI7o_03Fd88F5Xgz5QTjBmx5kUVmAunO0h-ww-BHJWcfychO-z_fDj58guEpJ79C3BT2ISWBpwOAhALh0NigB0jPLw_l37GhH9s4hF6R1ubu"
		}
		try {
			console.log("started this in customer ");
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_FETCH_API_PATh+"bcdbG7slC9mthKUjHxa180GOOE";
			
			const customerData = await fetch(url,{method:'get',headers:authHeaders});
			return await customerData.json();;
		}catch (error) {
			console.log(error);
		}
		
	}
	
	getToken(){
		return {"customer_id":"data"}
	}
}

  
export default Customer;