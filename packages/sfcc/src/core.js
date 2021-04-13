const PropertiesReader = require('properties-reader');



 

export class Core {
	 
	 
	constructor() {
		this.INSTANCE = 'Core Instance: ' + new Date();
		
		this.prop =  
		console.log("in Core Constructor "+this.INSTANCE);
		 
	}
	
	init(){
		console.log("in init method ");
	}
}

const coreSingleton = new Core();

export const CoreModule = coreSingleton;