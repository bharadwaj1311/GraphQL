const PropertiesReader = require('properties-reader');



 

export class Core {
	 
	 
	constructor() {
		this.INSTANCE = 'Core Instance: ' + new Date();
		
		console.log("in Core Constructor "+this.INSTANCE);
		 
	}
	
	
	getErrorMSG(errorKey){
		
		return prop.get(errorKey);
	}
	
	init(){
		this.prop = PropertiesReader('../ErrorCodes.properties');
	}

}

const coreSingleton = new Core();

export const CoreModule = coreSingleton;