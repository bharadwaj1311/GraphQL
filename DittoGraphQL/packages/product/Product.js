const fetch = require("make-fetch-happen");
var AppConstants = require('../../constants');
var Config = require('../../config');



var Product=function(){
	var authHeaders = {
			"Content-Type":"application/json",
			"Authorization": "Bearer eyJfdiI6IjEiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdiI6IjEiLCJleHAiOjE2MTc1MTY4ODgsImlhdCI6MTYxNzUxNTA4OCwiaXNzIjoiNTJlYzc3MzAtYTEyMy00MDgxLTkwOTItYzMyNjk0MWNlNDRkIiwic3ViIjoie1wiX3ZcIjpcIjFcIixcImN1c3RvbWVyX2luZm9cIjp7XCJjdXN0b21lcl9pZFwiOlwiYmNkYkc3c2xDOW10aEtVakh4YTE4MEdPT0VcIixcImd1ZXN0XCI6ZmFsc2UsXCJ2aXNpdF9pZFwiOlwiZTRhYWQ2NmU2MTM2NGUzMzY2ZmEwZjMxOTlcIn19In0.dl8XgldAVo8SGRDrrSAdnbD_tnRnfYwIrohjhsPW78JgTif2kukQqnB74RgKHRx6U5CTBee8ktTVwqnmtguRT-92Oeu3cCP6nNmYYDMwzYgYn37FQOYYF-DxdMJlpDqon__Srw1zzSv8FeF8A9bz6piz6gy37fIoF22p8GxeoCK4pCnPG9dbUo1EZO6eYtGK03NyskZdXN388FOOoxNgQoERrCsDll6jB5BWdV9bmP96Y2NpG_mOX_gOmYm_m7hJzKuY4zU90SGc-GYkbBKfRPK3GthTr0LNXVsknydirpsZDI1hlBjrCxNz689-ogulL1Pj3Zve88_OvaDSUp6H46kqlE9oH_Qp05W8b0eKqy5bK8KB8rhwE2aEdr54P4j93AKxCA1ThkkSq_6OsXroLf7dIstCSj8bbe-POGM6bXO3lw3gA7EgUBNsrE6lp-JFigHSAy0_RJoIQSrg8fr38qjHJl-Z0d_4vAKwZDRx3MMub1tBHNHlXg23InoVfptuAHuUvFZ2ip4Jogc5M_PcsxfCj-3cm8ZjNQCmbKEH9QVKP1ES4GfU3Oid1ysG9ysN"
	}
	return getData(authHeaders);
	 
	 
}

getData = async (authHeaders) => {
	try {
		console.log("started this in product ");
		const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_FETCH_API_PATh+"bcdbG7slC9mthKUjHxa180GOOE";
		
		const customerData = await fetch(url,{method:'get',headers:authHeaders});
		return await customerData.json();;
	}catch (error) {
		console.log(error);
	}
};

module.exports=Product;