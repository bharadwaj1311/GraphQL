/**
 * For Preparing Model Data of Customer.
 * for Logged in Customer
 * for Guest
 * for update Customer..
 */
class CustomerModel{
	constructor(){
	}
	/**
	 *  Get Customer Association data.....
	 */
	getCustomerAssoicatedData(respsonseObjJSON){
		var customerResponse= {};
		try{
			// it means it is error response:
			if(respsonseObjJSON){
				if(respsonseObjJSON.fault){
					customerResponse.error={};
					customerResponse.error.errorMSG = respsonseObjJSON.fault.message?respsonseObjJSON.fault.message:"Token Error:Generic Error";
					return customerResponse;
				}
				if(respsonseObjJSON.error){
					customerResponse.error={};
					customerResponse.error.errorMSG = JSON.stringify(respsonseObjJSON.error.errorMSG?respsonseObjJSON.error.errorMSG:respsonseObjJSON.error);
					customerResponse.error.errorCode = JSON.stringify(respsonseObjJSON.error.errorCode?respsonseObjJSON.error.errorCode:respsonseObjJSON.error);
					return customerResponse;
				}
				if(respsonseObjJSON.error_description){
					customerResponse.error={};
					customerResponse.error.errorMSG = JSON.stringify(respsonseObjJSON.error_description).toString();
					return customerResponse; 
				}
				customerResponse.customer_id = respsonseObjJSON.customer_id?respsonseObjJSON.customer_id:"";
				customerResponse.auth_type = respsonseObjJSON.auth_type?respsonseObjJSON.auth_type:"";
				//Only Logged in user will have below data...
				if(respsonseObjJSON.customer_no){
					customerResponse.creation_date = respsonseObjJSON.creation_date;
					customerResponse.enabled = respsonseObjJSON.enabled;
					customerResponse.email = respsonseObjJSON. email;
					customerResponse.login = respsonseObjJSON.login;
					customerResponse.customer_no = respsonseObjJSON.customer_no;
					customerResponse.first_name = respsonseObjJSON.first_name;
					customerResponse.last_name = respsonseObjJSON.last_name;
					customerResponse.gender = respsonseObjJSON.gender;
					customerResponse.last_login_time= respsonseObjJSON.last_login_time;
					customerResponse.last_modified = respsonseObjJSON.last_modified;
					customerResponse.last_visit_time	 = respsonseObjJSON.last_visit_time;
					customerResponse.phone_mobile	 = respsonseObjJSON.phone_mobile;
					customerResponse.previous_login_time= respsonseObjJSON.previous_login_time;
					customerResponse.previous_visit_time = respsonseObjJSON.previous_visit_time;
					customerResponse.success=true;
				}
				//Either Guest or logged in user we will have Token..
				if(respsonseObjJSON.token){
					customerResponse.token = respsonseObjJSON.token;
				}
			}else{
				customerResponse.error={};
				customerResponse.error.errorMSG ="Generic Error Create/fetch User Service Failed ";
			}
		}catch(error){
			customerResponse.error={};
			customerResponse.error.errorMSG = error.toString();
			console.error("CustomerModel.getCustomerAssoicatedData():"+error);
			customerResponse.success=false;
		}
		return customerResponse;
	}		
}

  
export default CustomerModel;