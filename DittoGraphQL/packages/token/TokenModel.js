const fetch = require("make-fetch-happen");
var AppConstants = require('../../constants');
var Config = require('../../config');



class TokenModel{
	constructor(){
	}
	
	getTokenAssoicatedData(respsonseObjJSON){
		var tokenResponse= {};
		try{
			// it means it is error response:
			if(respsonseObjJSON  && respsonseObjJSON.fault){
				tokenResponse.customer_id = ""
				tokenResponse.auth_type = "";
				tokenResponse.error = respsonseObjJSON.fault.message?respsonseObjJSON.fault.message:"Token Error:Generic Error";
				return tokenResponse;
			}
		 	tokenResponse.customer_id = respsonseObjJSON.customer_id?respsonseObjJSON.customer_id:"";
			tokenResponse.auth_type = respsonseObjJSON.auth_type?respsonseObjJSON.auth_type:"";
			 
			tokenResponse.creation_date = respsonseObjJSON.creation_date;
			tokenResponse.enabled = respsonseObjJSON.enabled;
			tokenResponse.email = respsonseObjJSON. email;
			tokenResponse.login = respsonseObjJSON.login;
			tokenResponse.customer_no = respsonseObjJSON.customer_no;
			tokenResponse.first_name = respsonseObjJSON.first_name;
			tokenResponse.last_name = respsonseObjJSON.last_name;
			tokenResponse.gender = respsonseObjJSON.gender;
			tokenResponse.last_login_time= respsonseObjJSON.last_login_time;
			tokenResponse.last_modified = respsonseObjJSON.last_modified;
			tokenResponse.last_visit_time	 = respsonseObjJSON.last_visit_time;
			tokenResponse.previous_login_time= respsonseObjJSON.previous_login_time;
			tokenResponse.previous_visit_time = respsonseObjJSON.previous_visit_time;
		 
			
			tokenResponse.customer_id = respsonseObjJSON.customer_id;
 			tokenResponse.success=true;
		}catch(error){
			console.error(" Error is "+error);
			//as these two fields are mandatory.
			tokenResponse.customer_id = "";
			tokenResponse.auth_type="";
			tokenResponse.success=false;
			tokenResponse.error = error.toString();
		}
		return tokenResponse;
	}		
}

  
export default TokenModel;