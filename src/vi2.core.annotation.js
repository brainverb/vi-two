/* 
*	name: Vi2.Assessment
*	author: niels.seidel@nise81.com
* license: BSD New
*	description: Abstract class for video annotations
* dependencies:
*  - jquery-1.11.2.min.js
*  - jquery.inherit-1.1.1.js
*	todo:
	- ...
*/

 
var Annotation = $.inherit(/** @lends Annotation# */{

		/** 
		* 	@constructs 
		*		@param {object} options An object containing the parameters
		*/
  	__constructor : function(options) {
  		this.options = options;  
		},
		
		name : 'annotation',
		type : 'annotation',
		options : {},

		/* ... */
		init : function(ann){},	
		
		/* -- */
		appendToDOM : function(id){},						
				
		/* ... */
		begin : function(e, id, obj){},
	
		/* ... */
		end : function(e, id){},
		
		
		/** 
		Formats time from seconds to decimal mm:ss
		@todo: include hours
		*/		
		formatTime : function(secs){
			var seconds = Math.round(secs);
    	var minutes = Math.floor(seconds / 60);
    	minutes = (minutes >= 10) ? minutes : "0" + minutes;
    	seconds = Math.floor(seconds % 60);
    	seconds = (seconds >= 10) ? seconds : "0" + seconds;
    	return minutes + "" + seconds;
		}
		
	}); // end class Annotation
