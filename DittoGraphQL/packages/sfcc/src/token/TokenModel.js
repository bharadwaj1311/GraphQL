
/**
 * Process Token Model 
 *	for Guest, Logged in, Refresh Tokens
 *	for oAuth Token  & environment wise oAuth Token.
 *	we are using to prepare output model..	
 */
class TokenModel{
	constructor(){
	}
	/**
	 *  Get Token Association data.....
	 */
	getTokenAssoicatedData(respsonseObjJSON){
		var tokenResponse= {};
		try{
			// it means it is error response:
			if(respsonseObjJSON){
				//if it is fault
				if(respsonseObjJSON.fault){
					tokenResponse.error = respsonseObjJSON.fault.message?respsonseObjJSON.fault.message:"Token Error:Generic Error";
					return tokenResponse;
				}
				if(respsonseObjJSON.error || respsonseObjJSON.error_description){
					var errorMessage = "Error : ";
					if(respsonseObjJSON.error){
						errorMessage = respsonseObjJSON.error.toString();
					}else  if(respsonseObjJSON.error_description){
						errorMessage = respsonseObjJSON.error_description.toString();
					}
					tokenResponse.error = errorMessage;
					return tokenResponse;
				}
				//Update These Fields for guest/Logged in / refresh tokens....
				if(respsonseObjJSON.customer_id){
					tokenResponse.customer_id = respsonseObjJSON.customer_id;
					tokenResponse.customer_no = respsonseObjJSON.customer_no;
					tokenResponse.email = respsonseObjJSON. email;
					tokenResponse.login = respsonseObjJSON.login;
					tokenResponse.auth_type = respsonseObjJSON.auth_type;
				}
				
				//update these fields for oAuth Token & envAuthToken
				if(respsonseObjJSON.access_token){
					tokenResponse.token = respsonseObjJSON.access_token;
					tokenResponse.scope = respsonseObjJSON.scope;
					tokenResponse.token_type= respsonseObjJSON.token_type;
					tokenResponse.expires_in = respsonseObjJSON.expires_in;
				}
			}else{
				tokenResponse.error = "Token Call Response Object is Null";
			}
			tokenResponse.success=true;
		}catch(error){
			console.error("TokenModel.getTokenAssoicatedData():"+error);
		 	tokenResponse.success=false;
			tokenResponse.error = error.toString();
		}
		return tokenResponse;
	}		
}  
export default TokenModel;