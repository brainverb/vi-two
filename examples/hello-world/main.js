


/** class Vi-Lab **/ 
var VI2Core = $.inherit({ 

  __constructor : function() { 
  	vi2 = this;
  	var files = [
  			{path: 'data.json', storage: 'json_data'}
  	];
		
		this.db = new DataBase({path: '/', files: files}, this, 'init');
  },
  
  db : '',
  viLog : '',
  observer:'',
  
  /**
  
  */
  init : function(){
  	this.viLog = new Log({logger_path:this.server_url+'/log'}); 
  			
  	vi2.utils = new Vi2_Utils();
  	
  	this.observer = new Observer({selector:"#seq", videoWidth:"400px", videoHeight:"800px"}); 
		this.observer.init(0);
		//this.observer.setCurrentStream('seidel1');
		this.observer.parse('#vi2', 'html');
		
		//var widget = new TOC({vizOnTimeline: true, path: this.server_url+'/vi-lab/img/user-icons/'}); 
		//this.observer.addWidget(widget); 
  }
  

}); // class

