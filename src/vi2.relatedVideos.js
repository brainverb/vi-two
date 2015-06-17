	/* RelatedVideos
	author: niels.seidel@nise81.com
	
	to-do
	- destructor: man möchte ja nicht nur im eigenen Saft schwimmen (filter bubble), sondern auch auf andere Themen stoßen ... statt optimal match
	- (server side) 	- users that have seen this video also took a look at ...

	*/


	 
Vi2.RelatedVideos = $.inherit(/** @lends Vi2.RelatedVideos# */{

		/** 
		*		@constructs 
		*		@param {object} options 
		*		@param {object} options.modes Object...
		*		@param {Number} options.modes.weight Weight of the given criteria
		*		@param {Number} options.limit Number of requestested related videos
		*/
  	__constructor : function(options) { 
  		this.options = $.extend(this.options, options); 
		},
				
		name : 'related-videos',
		options : {
			resultSelector:'.related-videos', 
			limit : 10, 
			modes: [ 
				{ mode: 'random-destructor', weight:0.4 },
				{ mode: 'outgoing-links', weight:0.4 },
				{ mode: 'incomming-links', weight:0.4 },
				{ mode: 'outgoing-links', weight:0.8 },
				{ mode: 'same-author', weight:0.8 }
				]
			},
		results : {},		
		player : null,
		
		/* ... */
		init : function(ann){
			//var _this = this;
			//this.link_list = this.buildLinkList(ann);	
			this.determineModes( vi2.observer.current_stream );
		},
		
		
		/* -- */
		determineModes : function(id){
			var _this = this;
			var streams = []; 
			$.each( this.options.modes, function(i, mode){ 
				switch(mode.mode){
					case "random-destructor":
						_this.weightResults( vi2.db.getRandomStreams(id, _this.options.limit), mode.weight );	
						break;
					case "incomming-links" :
						_this.weightResults( vi2.db.getLinkSourcesById(id), mode.weight );	
						break;
					case "outgoing-links" :
						_this.weightResults( vi2.db.getLinkTargetsById(id), mode.weight );	
						break;
					case "same-author"	:
						_this.weightResults( vi2.db.getStreamsOfSameAuthor(id), mode.weight );	
						break;
					case "same-tags"	: 
						_this.weightResults( vi2.db.getStreamsWithSameTag(id), mode.weight);	
						break;
					default :
						// do nothing			
				}
			}); 
			// render results
			this.showRelatedVideos();
		},
		
		
		/*
		* @res {object} {<stream-id>: <number of occurances>}
		**/
		weightResults : function(res, weight){  
			var _this = this;
			$.each(res, function(i, val){
				if( i in _this.results == false ){  
					_this.results[ i ] = 0;
				} 
				_this.results[ i ] += Math.floor(val * weight * 10)/10; // bug: strange floating number as result
			});
			//alert(JSON.stringify(_this.results))
		},
		
		/**
		
		*/
		sortByRelevance : function(arr){
			var sortable = [];
			for (var el in arr){
						sortable.push([el, arr[el]]);
			}			
			return sortable.sort(function(a, b) {return  b[1] - a[1]})
		},
		
		
		/** 
		Renders results
		*/
		showRelatedVideos : function(id){
			var _this = this;
			// sort by relevance 
			this.results = this.sortByRelevance( this.results );
			var ul = $('<ul></ul>')
				.appendTo(_this.options.resultSelector);
			var j = 0;	
			$.each(this.results, function(i,val){
				if( j < _this.options.limit ){
					var t = val.toString().split(',');
					var li = $('<li></li>').text( t[0] + ' (' + t[1] + ')').appendTo(ul);	
				}
				j++;
			});
		},	
		
		


		/** deprecated ...  */
		showLinkSummary : function(e){ return;
		 var _this = this;
			var screen = observer.openScreen(this.options.resultSelector);
			// prepare link list (remove doubles)
			var ex = [];
			$.each(_this.link_list.tags, function(i, val){
				if(ex.indexOf(val.target) == -1){
					val.name = vi2.db.getMetadataById(val.target.replace(/\#!/, '')).title; 
					ex.push(val.target);
				}else{ 
					val.name = 0; val.target = '';
				}
				
			});
			// use template
			screen.setTemplate('<div><h3>Related Lectures:</h3><ul>{#foreach $T.tags as link}{#if $T.link.name == 0}{#else}<li><a href="{$T.link.target}">{$T.link.name}</a></li>{#/if}{#/foreach}</ul></div>');
			screen.processTemplate(_this.link_list);
			
		}
		
		
	}); // end class RelatedVideos		
