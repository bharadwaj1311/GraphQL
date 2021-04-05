const fetch = require("make-fetch-happen");
var AppConstants = require('../../constants');
var Config = require('../../config');



var Payment=function(){

}

function getPaymentDetails(){
	getPaymentData = async () => {
		try {
			console.log("fetch Payment Details:: ");
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization": "Bearer eyJfdiI6IjEiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdiI6IjEiLCJleHAiOjE2MTc1Mzk2MzIsImlhdCI6MTYxNzUzNzgzMiwiaXNzIjoiNTJlYzc3MzAtYTEyMy00MDgxLTkwOTItYzMyNjk0MWNlNDRkIiwic3ViIjoie1wiX3ZcIjpcIjFcIixcImN1c3RvbWVyX2luZm9cIjp7XCJjdXN0b21lcl9pZFwiOlwiYmNkYkc3c2xDOW10aEtVakh4YTE4MEdPT0VcIixcImd1ZXN0XCI6ZmFsc2UsXCJ2aXNpdF9pZFwiOlwiMTk1NmI5ODdiMjgzZjVlM2VmNDcwMGViODNcIn19In0.dl8XgldAVo8SGRDrrSAdnbD_tnRnfYwIrohjhsPW78JgTif2kukQqnB74RgKHRx6U5CTBee8ktTVwqnmtguRTzyCcMl95STCT78t71T6i6zLfiYfTGFredfw_BnJow2hwuwZWc5L8LLRx_d3ahUuLJiz6gy37fIoF22p8GxeoCK4pCnPG9dbUo1EZO6eYtGK03NyskZdXN388FOOoxNgQoERrCsDll6jB5BWdV9bmP96Y2NpG_mOX_gOmYm_m7hJzKuY4zU90SGc-GYkbBKfRPK3GthTr0LNXVsknydirpsZDI1hlBjrCxNz689-ogulL1Pj3Zve88_OvaDSUp6H46kqlE9oH_Qp05W8b0eKqy5bK8KB8rhwE2aEdr54P4j93AKxCA1ThkkSq_6OsXroLf7dIstCSj8bbe-POGM6bXM_qOE7mVmEPVqhYs4G1PiGed6pdEg3a7DGaOcyVqPvvIAU07a9djqMsmMvQ5OweusR6kd2zoByjv7qkh9oI6e9qT8tncxaiiyPMyOAMQL6H1sVlD3coLAgKXts9pikXiiAxibXXYEX9xlN1Pbm9Msc"
			}
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_FETCH_API_PATh+"bcdbG7slC9mthKUjHxa180GOOE"+Config.SFCC_PAYMENT_API;
			
			const paymentData = await fetch(url,{method:'get',headers:authHeaders});
			return await paymentData.json();
		}catch (error) {
			console.log(error);
		}
	};
	
	return getPaymentData();
	
}
function createPaymentDetails(args){
	createPaymentData = async (args) => {
		try {
			 
			var authHeaders = {
				"Content-Type":"application/json",
				"Authorization": "Bearer eyJfdiI6IjEiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdiI6IjEiLCJleHAiOjE2MTc1Mzk2MzIsImlhdCI6MTYxNzUzNzgzMiwiaXNzIjoiNTJlYzc3MzAtYTEyMy00MDgxLTkwOTItYzMyNjk0MWNlNDRkIiwic3ViIjoie1wiX3ZcIjpcIjFcIixcImN1c3RvbWVyX2luZm9cIjp7XCJjdXN0b21lcl9pZFwiOlwiYmNkYkc3c2xDOW10aEtVakh4YTE4MEdPT0VcIixcImd1ZXN0XCI6ZmFsc2UsXCJ2aXNpdF9pZFwiOlwiMTk1NmI5ODdiMjgzZjVlM2VmNDcwMGViODNcIn19In0.dl8XgldAVo8SGRDrrSAdnbD_tnRnfYwIrohjhsPW78JgTif2kukQqnB74RgKHRx6U5CTBee8ktTVwqnmtguRTzyCcMl95STCT78t71T6i6zLfiYfTGFredfw_BnJow2hwuwZWc5L8LLRx_d3ahUuLJiz6gy37fIoF22p8GxeoCK4pCnPG9dbUo1EZO6eYtGK03NyskZdXN388FOOoxNgQoERrCsDll6jB5BWdV9bmP96Y2NpG_mOX_gOmYm_m7hJzKuY4zU90SGc-GYkbBKfRPK3GthTr0LNXVsknydirpsZDI1hlBjrCxNz689-ogulL1Pj3Zve88_OvaDSUp6H46kqlE9oH_Qp05W8b0eKqy5bK8KB8rhwE2aEdr54P4j93AKxCA1ThkkSq_6OsXroLf7dIstCSj8bbe-POGM6bXM_qOE7mVmEPVqhYs4G1PiGed6pdEg3a7DGaOcyVqPvvIAU07a9djqMsmMvQ5OweusR6kd2zoByjv7qkh9oI6e9qT8tncxaiiyPMyOAMQL6H1sVlD3coLAgKXts9pikXiiAxibXXYEX9xlN1Pbm9Msc"
			}
			const url = Config.SFCC_ENV_URL+Config.SFCC_CUSTOMER_FETCH_API_PATh+"bcdbG7slC9mthKUjHxa180GOOE"+Config.SFCC_PAYMENT_API;
			const paymentData = await fetch(url,{method:'post',headers:authHeaders,body:JSON.stringify(args.input)});
			return await paymentData.json();
		}catch (error) {
			console.log(error);
		}
	};
	return createPaymentData(args); 
}


exports.getPaymentDetails = getPaymentDetails;
exports.createPaymentDetails = createPaymentDetails;
 