/*
	Copywrite Square Bracket LLC - Sean Clark 2012-3012
	http://square-bracket.com 	
	http://connect.ai	
	http://youtube.com/optikalefxx
*/
(function($) {
	$.fn.autofill = function(opts) {
		return this.each(function() {
			var self = this,
				usingTags = $(this).parent().hasClass("tags-wrapper");
			
			if(!opts) opts = {};
			// if were combined with tagging
			if(usingTags) {
				self = $(this).parent().find("li input");
			}

			// make this guy see through
			$(self).css({
				"background":"transparent",
				"position":"absolute",
				"z-index":2,
				"outline":"none"
			});
			
			// create the div wrapper
			var $wrapper = $("<div class='autofill-wrapper'></div>").css("position","relative");
			// wrap
			$(self).wrap($wrapper);
			// reset wrapper cuz now its doc fragment?
			$wrapper = $(self).parent();
			// make the bg input
			var color = opts.color || "rgba(214,215,220,1)";
			var top = opts.top || -4;
			var $bg = $("<input type='text' class='autofill-bg' disabled/>").css({
				"color":color,
				"top": top,
				"outline":"none"
			});
			
			
			
			// set data
			$bg.data("data",opts.data);
		
			var bg = $bg[0];
			// add classes
			if(opts.classList) $bg.addClass(opts.classList);
			// add the bg input (this not being absolute keeps the spacing)
			$wrapper.append($bg);
			
			// add listeners for data
			if(opts.data) {
				
				// we have to do this here because of tab
				$(self).on("keydown",function(e) {
					if(!!~[39,13,9].indexOf(e.keyCode)) {
						e.preventDefault();
						this.value = bg.value;
						bg.value = "";
					}
				});
				
				// keyup for letters
				$(self).on("keyup",function(e) {
					var found = 0,rx,val = this.value;
					if(val) {
						opts.data.forEach(function(term) {
							rx = new RegExp("^"+val);
							if(rx.test(term)) {
								bg.value = term;
								found++;
							}
						});
						
						// if no matches
						if(!found) bg.value = "";
					
					// blank
					} else {
						bg.value = "";
					}
				});
			}
	
		});
	}
})(jQuery);