/**
 *Application wise logger.
 */
  
 import {
    getLogger
} from '../../../index.js';
class AppLogger{
	 
	constructor(){
	}
	static getLoggerRef(){
		 return getLogger();
	}	

	static setLevel(level) {
        AppLogger.setLevel(level)  
    }

    static log(...args ) {
        AppLogger.getLoggerRef().info(...args);
    }

    static  info(...args ){
        AppLogger.getLoggerRef().info(...args);
    }

    static  debug(...args ) {
        AppLogger.getLoggerRef().debug(...args);
    }
}  
export default AppLogger;