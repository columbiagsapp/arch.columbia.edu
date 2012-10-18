/* 6/13/2012
 *
 * Author: Jochen Hartmann
 */

/**
 * Namespacing
 */
var gsappFetcher = {};

/**
 * @fileoverview Frontend app to to handle events and DOM manipulation for
 * revised GSAPP dashboard.
 */


/**
 * Whether to log to firebug console (wraps console.log)
 * @type Boolean
 */
gsappFetcher.enableLogging = false;

/**
 * Storing proper stings for month names since the native JS Date object
 * only contains abbreviations
 * @type Array
 */
gsappFetcher.month_names = new Array ( );
gsappFetcher.month_names[gsappFetcher.month_names.length] = "January";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "February";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "March";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "April";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "May";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "June";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "July";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "August";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "September";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "October";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "November";
gsappFetcher.month_names[gsappFetcher.month_names.length] = "December";

/**
 * Storing proper stings for day names since the native JS Date object
 * only contains abbreviations
 * @type Array
 */
gsappFetcher.day_names = new Array ( );
gsappFetcher.day_names[gsappFetcher.day_names.length] = "Sunday";
gsappFetcher.day_names[gsappFetcher.day_names.length] = "Monday";
gsappFetcher.day_names[gsappFetcher.day_names.length] = "Tuesday";
gsappFetcher.day_names[gsappFetcher.day_names.length] = "Wednesday";
gsappFetcher.day_names[gsappFetcher.day_names.length] = "Thursday";
gsappFetcher.day_names[gsappFetcher.day_names.length] = "Friday";
gsappFetcher.day_names[gsappFetcher.day_names.length] = "Saturday";

/**
 * How many posts to get from a tumblr feed. Default is 10
 * @type Number
 */
gsappFetcher.tumblr_posts = 10;

// HTML Truncator for jQuery
// by Henrik Nyh <http://henrik.nyh.se> 2008-02-28.
// Free to modify and redistribute with credit.

(function($) {

  var trailing_whitespace = true;

  $.fn.truncate = function(options) {

    var opts = $.extend({}, $.fn.truncate.defaults, options);
    
    $(this).each(function() {

      var content_length = $.trim(squeeze($(this).text())).length;
      if (content_length <= opts.max_length)
        return;  // bail early if not overlong

      var actual_max_length = opts.max_length - opts.more.length - 3;  // 3 for " ()"
      var truncated_node = recursivelyTruncate(this, actual_max_length);
      var full_node = $(this).hide();

      truncated_node.insertAfter(full_node);
	  
      findNodeForMore(truncated_node).append('...');
      


    });
  }

  // Note that the " (â€¦more)" bit counts towards the max length â€“ so a max
  // length of 10 would truncate "1234567890" to "12 (â€¦more)".
  $.fn.truncate.defaults = {
    max_length: 100,
    more: 'â€¦more',
    less: 'less'
  };

  function recursivelyTruncate(node, max_length) {
    return (node.nodeType == 3) ? truncateText(node, max_length) : truncateNode(node, max_length);
  }

  function truncateNode(node, max_length) {
    var node = $(node);
    var new_node = node.clone().empty();
    var truncatedChild;
    node.contents().each(function() {
      var remaining_length = max_length - new_node.text().length;
      if (remaining_length == 0) return;  // breaks the loop
      truncatedChild = recursivelyTruncate(this, remaining_length);
      if (truncatedChild) new_node.append(truncatedChild);
    });
    return new_node;
  }

  function truncateText(node, max_length) {
    var text = squeeze(node.data);
    if (trailing_whitespace)  // remove initial whitespace if last text
      text = text.replace(/^ /, '');  // node had trailing whitespace.
    trailing_whitespace = !!text.match(/ $/);
    var text = text.slice(0, max_length);
    // Ensure HTML entities are encoded
    // http://debuggable.com/posts/encode-html-entities-with-jquery:480f4dd6-13cc-4ce9-8071-4710cbdd56cb
    text = $('<div/>').text(text).html();
    return text;
  }

  // Collapses a sequence of whitespace into a single space.
  function squeeze(string) {
    return string.replace(/\s+/g, ' ');
  }
  
  // Finds the last, innermost block-level element
  function findNodeForMore(node) {
    var $node = $(node);
    var last_child = $node.children(":last");
    if (!last_child) return node;
    var display = last_child.css('display');
    if (!display || display=='inline') return $node;
    return findNodeForMore(last_child);
  };

  // Finds the last child if it's a p; otherwise the parent
  function findNodeForLess(node) {
    var $node = $(node);
    var last_child = $node.children(":last");
    if (last_child && last_child.is('p')) return last_child;
    return node;
  };

})(jQuery);


/**
 * Write to firebug console if logging enabled
 * @param {String,Object} data The item to log
 */
gsappFetcher.log = function(data) {
  if (gsappFetcher.enableLogging == true) {
    console.log(data);
  }
}

/**
 * Find CSS color class based off location
 * @param {String} The location string, i.e. New York
 * @return {String, Boolean} The css class, i.e. 'north-america' if found,
 * false otherwise
 */
gsappFetcher.findLocationClass = function(location_string) {
	// basic array that we can use to store future location code mappings
	locations = new Array();
	locations['Amman'] = 'middle-east';
	locations['Barcelona'] = 'europe';
	locations['Beijing'] = 'asia';
	locations['Moscow'] = 'europe';
	locations['Mumbai'] = 'south-asia';
	locations['New York'] = 'north-america';
	locations['Rio De Janeiro'] = 'latin-america';
	locations['Sao Paulo'] = 'latin-america';
	locations['Toronto'] = 'north-america';
	
	
	test_location = locations[location_string];
	if ((test_location != null) && (test_location != undefined)) {
		return test_location;
	} else {
		return false;
	}
}

/**
 * Convert location array to CSS color array
 * @param {Array} An array of locations
 * @return {String} The CSS class found for the location
 */
gsappFetcher.getCSSColorClassForLocations = function(locations_array) {
	var color_location = '';
	for (var j=0;j<locations_array.length;j++) {
		var color_class = gsappFetcher.findLocationClass(locations_array[j]);
		if (color_class != false) {
			return color_class;
		}
	}
	return color_location;
}


/**
 * Parse location names from Drupal location HTML output
 * @param {String} The location string from Drupal view output
 * @return {Array} An arry of location strings
 */
gsappFetcher.getLocationsFromHTML = function(location_string) {
	var location_element = $(location_string);
	var locations = $("span.lineage-item", location_element);
	var locations_array = [];
	for (var i=0;i<locations.length;i++){
		locations_array.push($(locations[i]).text());
	}
	return locations_array;
}

/**
 * Get event types from Drupal HTML string
 * @param {String} The location string from Drupal view output
 * @return {Array} An arry of type strings
 */
gsappFetcher.getEventTypesFromHTML = function(types_string) {
	// TODO maybe abstract this more later
	return gsappFetcher.getLocationsFromHTML(types_string);
}			

/**
 * Convert a date from drupal output to a proper JS Date object
 * @param {String} The date string from Drupal
 * @return {Date} JS Date object
 */
gsappFetcher.createDateObject = function(date_string) {
	var year = date_string.substr(0,4);
	var month = date_string.substr(5,2) - 1;
	var day = date_string.substr(8,2);
	var hour = date_string.substr(11,2);	
	var min = date_string.substr(14,2);
	var sec = date_string.substr(17,2);
	return new Date(year,month,day,hour,min,sec);
}


/**
 * Formate a Date object into a custom date string
 * @param {Date} JS Date object
 * @return {String} String in the format:
 * Tuesday, May 8, 2012 7:00pm
 */
gsappFetcher.formatDate = function(date) {

	// append 0 to minutes if < 10
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	var end_string = 'am';
	var hours = date.getHours();
	if (hours > 12) {
		hours = hours - 12;
		end_string = 'pm';
	}
	
	date_string_a = [
		gsappFetcher.day_names[date.getDay()], ', ',
		gsappFetcher.month_names[date.getMonth()], ' ',
		date.getDate(), ', ', date.getFullYear(), ' ',
		hours, ':', minutes, end_string];
	
	return date_string_a.join('');
}

/**
 * Formate a Date object into a custom date string
 * @param {Date} JS Date object
 * @return {String} String in the format:
 * Tuesday, May 8, 2012 7:00pm
 */
gsappFetcher.formatDateTimeOnly = function(date) {

	// append 0 to minutes if < 10
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	var end_string = 'am';
	var hours = date.getHours();
	if (hours > 12) {
		hours = hours - 12;
		end_string = 'pm';
	}
	
	date_string_a = [
		hours, ':', minutes, end_string];
	
	return date_string_a.join('');
}

/**
 * Formate a Date object into a custom date string
 * @param {Date} JS Date object
 * @return {String} String in the format:
 * Tuesday, May 8, 2012 7:00pm
 */
gsappFetcher.formatTumblrDate = function(date) {
	date_string_a = [
		gsappFetcher.day_names[date.getDay()], ', ',
		gsappFetcher.month_names[date.getMonth()], ' ',
		date.getDate(), ', ', date.getFullYear()];
	
	return date_string_a.join('');
}

/**
 * Formate a Date object into a custom date string
 * @param {Date} JS Date object
 * @return {String} String in the format:
 * Friday, August 31, 2012 11:00am
 */
gsappFetcher.formatDateForWidget = function(date) {
	
	date_string_a = [
		gsappFetcher.day_names[date.getDay()], ', ',
		gsappFetcher.month_names[date.getMonth()], ' ',
		date.getDate()];
	
	return date_string_a.join('');
}

/**
 * Formate a Date object into a custom date string
 * @param {Date} JS Date object
 * @return {String} String in the format:
 * Friday, August 31, 2012 11:00am
 */
gsappFetcher.formatTimeForWidget = function(date) {

	// append 0 to minutes if < 10
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	var end_string = 'am';
	var hours = date.getHours();
	hours = hours - 4;
	if (hours > 12) {
		hours = hours - 12;
		end_string = 'pm';
	}
	
	date_string_a = [
		hours, ':', minutes, end_string];
	
	return date_string_a.join('');
}

/**
 * Formate a Date object into a custom date string for the date box
 * @param {Date} JS Date object
 * @return {String} HTML string in the format:
 * May<br/>8
 */

gsappFetcher.formatDateForBox = function(date) {
	var month_name = gsappFetcher.month_names[date.getMonth()];
	return [month_name.substr(0,3), '<br/>',
		date.getDate()].join('');
}

/**
 * Formate a Date object into a custom date string for the date box
 * @param {Date} JS Date object
 * @return {String} HTML string in the format:
 * May<br/>8
 */

gsappFetcher.formatDateForWidgetBox = function(date) {
	var month_name = gsappFetcher.month_names[date.getMonth()];
	return [date.getDate(), '<br/>',
		month_name.substr(0,3)].join('');
}

/**
 * Change the number of posts being read from a tumblr blog
 * @return void
 */
gsappFetcher.setTumblrPosts = function(number) {
	if ((number != undefined) && (isNaN(number) == false)) {
		gsappFetcher.tumblr_posts = number;
	}
}

/**
* Function to return tumblr data from tumblr API v1
*
* @param {String} url The URL for the JSON feed
* @param {String} elementName The name of the DOM container to write into. 
* Optional. If not provided, the default div#tumblr-results will be used, if 
* found.
* @return void
*/
gsappFetcher.getTumblr = function(url, element_name) {
	var final_url = null;
	// clean the URL in case / at last char
	if (url.charAt(url.length-1) == '/') {
		url = url.substr(0, url.length-1);
	}
	final_url = url + "/api/read/json?callback=?";
	

		$.getJSON(final_url, function(data) {
			$.each(data.posts.slice(0,gsappFetcher.tumblr_posts), function(i,posts){
			  var type = this.type;
					var url = this.url;
					var multi_content_flag = false; 
				
			  // format the date
			  var date_ts = this["unix-timestamp"];
			  var date = new Date(date_ts*1000); // must multiply by 1000 (js specific)
			  var date_string = gsappFetcher.formatTumblrDate(date);
		
					// process tags if any
			  var tags = this.tags || null;
					var tag_string = '';      
			  if (this.tags != null) {
				tag_string = this.tags.join(', ');
			  }
					
				// does the post body contain multiple photos?
				if ((this.type == 'photo') && (this["photos"].length > 0)) {
					multi_content_flag = true;
				}
				
				// TODO image aspect resizing for proper IMG tags
		
				var tumblr_title = null;
				var tumblr_content = null;
				var tumblr_caption = null;
				var multi_content = new Array();
				var multi_caption = new Array();
				var tumblr_quote = null;
				
				switch(type) {
					
					case 'link':
						tumblr_content_a = new Array();
						if (this["link-text"] != null) {
							tumblr_content_a= ['<h2><a href="', this["link_url"], '" target="_blank">', this["link-text"], '</a></h2>'];
						} else {
							// no title
							tumblr_content_a = ['<h2><a href="', this["link_url"], '" target="_blank">', this["link-url"], '</a></h2>'];
						}					
						if (this["link-description"].length > 0) {
							tumblr_content_a.push('<div class="embedded-tumblr-link-description">');
							tumblr_content_a.push(this["link-description"]);
							tumblr_content_a.push('</div>');
						}
						tumblr_content = tumblr_content_a.join('');
						break;					
					case 'quote':
						tumblr_content = ['<p>',this["quote-text"], "<br/>&mdash; ", this["quote-source"],'</p>'].join('');
						tumblr_quote = true;
						break;
					case 'video':
						tumblr_content = this["video-player-500"];
						tumblr_caption = this["video-caption"] || null;
						break;
					case 'audio':
						tumblr_content = this["audio-player"];
						tumblr_caption = this["id3-title"] || null;
						break;
					case 'conversation':
						
					//TODO break up into structured inner divs
						var temp_content = new Array();
						for(var c=0; c< this["conversation"].length;c++) {
							var conversation_part = this["conversation"][c];
							var inner_convo_string = [
								'<div class="embed-tumblr-conversation-segment">',
								'<div class="embed-tumblr-conversation-speaker">',
								conversation_part["name"], ': </div>',
								'<div class="embed-tumblr-conversation-phrase">',
								conversation_part["phrase"], '</div>', '</div>'].join('');
							temp_content.push(inner_convo_string);
						}
						tumblr_title = this["conversation-title"] || null;
						tumblr_content = temp_content.join('');
						break;
					case 'regular':
						tumblr_title = this["regular-title"] || null;
						tumblr_content = this["regular-body"] || null;
						break;
					case 'photo': // consider multi, if yes, then make arrays
						if (multi_content_flag == true) {
							for(var c=0;c<this["photos"].length;c++) {
								var photo_item = this["photos"][c];
								if(c == 0){
									var content = ['<img src="', photo_item["photo-url-500"],
								'" class="tmpltzr-image" alt="tumblr image" />'].join('');
								}else{
									var content = ['<img src="', photo_item["photo-url-250"],
								'" class="tmpltzr-image-small" alt="tumblr image" />'].join('');
								}
								multi_content.push(content);
								multi_caption.push(photo_item["caption"]);
							}
						
						} else { // single photo only
							tumblr_content = ['<img src="', this["photo-url-500"],
								'" class="tmpltzr-image" alt="tumblr image" />'].join('');
							tumblr_caption = this["photo-caption"] || null;
						}
						break;
				}
				
				var tumblr_div = [
					'<div class="embedded-tumblr">'];
				
				// main content: is there one more items (i.e. photos)
				if (multi_content == false) {
					if( (tumblr_quote != null) || (tumblr_title != null) ){
						tumblr_div.push('<div class="tumblr-post-date">Posted ');
						tumblr_div.push(date_string);
						tumblr_div.push('</div>');
						if(tumblr_title != null){
							tumblr_div.push('<h2>');
							tumblr_div.push(tumblr_title);
							tumblr_div.push('</h2>');
						}
						if(tumblr_quote != null){
							
						}
					}
					var content_string = [
						'<div class="tmpltzr-body ',
						type, '">', tumblr_content];

					if ((tumblr_title == null) && (tumblr_quote == null)) {
						content_string.push('<div class="tumblr-post-date">Posted ');
						content_string.push(date_string);
						content_string.push('</div>');
					}

					if (tumblr_caption != null) {
						content_string.push('<div class="tumblr-caption">');
						content_string.push(tumblr_caption);
						content_string.push('</div>');
					}
					tumblr_div.push(content_string.join(''));
				} else {
					// build multi-content div
					//var multi_content_string = new Array();
					var first = ' first';
					var even = '';
					var multi_content_string = ['<div class="tmpltzr-body photoset">'];
					for(var c=0;c<multi_content.length;c++) {
						var temp_string = ['<div class="tmpltzr-body '];
						temp_string.push(type);
						if(c==0){temp_string.push(first);}
						temp_string.push(even);
						temp_string.push('">');
						temp_string.push(multi_content[c]);
						temp_string.push('</div>');
						var temp_string_final = temp_string.join('');
						multi_content_string.push(temp_string_final);

						if(c%2 == 1){
							even = ' odd';
						}else{
							even = ' even';
						}
					}
					multi_content_string.push('<br/><div class="tumblr-post-date">Posted ');
					multi_content_string.push(date_string);
					multi_content_string.push('</div>');// /tumblr-post-date

					if ((multi_caption[0] != undefined) && (multi_caption[0].length > 0)) {
						multi_content_string.push('<div class="tumblr-caption">');
						multi_content_string.push(multi_caption[0]);
						multi_content_string.push('</div>');
					}

					multi_content_string.push('</div>');// /tmpltzr-body photoset
					tumblr_div.push(multi_content_string.join(''));
				}
				if(this.tags != null){
					tumblr_div.push('<div class="tmpltzr-tags">Tags: ');
					tumblr_div.push(tag_string);
					tumblr_div.push('</div>');
				}

				tumblr_div.push('<div class="embedded-tumblr-permalink"><a href="');
				tumblr_div.push(url);
				tumblr_div.push('" target="_blank">Visit this post</a></div>');
				
				
				var tumblr_div_string = tumblr_div.join('');
				
				if ((element_name != undefined) && (element_name.length > 0)) {
					$(elementName).append(tumblr_div_string);
				} else {
					$('#tumblr-results').append(tumblr_div_string);
				}
			  
			});
		})
		.error(function() { gsappFetcher.log('error loading tumblr'); })
		.complete(function() {
			safelog('tumblr calling back');
			setTimeout(gsapp.buildWall, 0);
			if( $('body.mobile').length){
				gsapp._remove_flash_content();
				setTimeout(function () {
					gsappMobile.contentScroll.refresh();
				}, 1500);
			}else if( $('body.iscroll').length > 0 ){
				gsapp._remove_flash_content();
				setTimeout(function () {
					safelog('tumblr timeout executed');
					//gsappMobile.contentScroll.refresh();
					gsappMobile.contentScroll.destroy();
					gsappMobile.contentScroll = null;
					gsappMobile.contentScroll = new iScroll('wrapper');
					gsappMobile.contentScroll.refresh();
				}, 1500);	
			}
		});

	
	
	
}

/**
 * Function to return event data from JSON formatted views
 * coming from the GSAPP events site
 *
 * @param {String} url The URL for the JSON feed
 * @param {String} elementName The name of the DOM container to write into
 * @return void
 */
gsappFetcher.getEventData = function(url, elementName) {
	gsappFetcher.log("getting data from " + url + " into " + elementName);
	$.getJSON(url, function(data) {
		var nodes = data.nodes;
		var event_div = '<div class="event-output-tmpltzr">';
		for (var i=0; i<nodes.length;i++) {
			var event = nodes[i].node;
			// convert date and offset it
			var date = gsappFetcher.createDateObject(event.field_event_date_value);

			// each date has different offsets			
			var date_offset = 60000 * date.getTimezoneOffset();
			new_date = new Date(date - date_offset);
			var date_string = gsappFetcher.formatDate(new_date);

			var date_string_for_box = gsappFetcher.formatDateForBox(date);

			// parse locations and assign css classes for color
			var locations_array = gsappFetcher.getLocationsFromHTML(
				event.field_event_location_value);

			var css_class_for_location = 
				gsappFetcher.getCSSColorClassForLocations(
					locations_array);
			
			// parse event types
			var types_array = gsappFetcher.getEventTypesFromHTML(event.field_event_taxonomy_type_value);
			
			// get the path to the node
			// TODO UPDATE path to prod
			var path = ['http://events.gsapp.org/node/', event.nid].join('');
			
			// build the div
			event_div = [event_div, '<div class="embedded-event">',
				'<a target="_blank" class="region" href="', path, '">', 
				'<div class="embedded-event-top-area">',
				'<div class="embedded-event-date-box ',
				css_class_for_location, '"><div>',
				date_string_for_box, '</div></div>',
				'<div class="embedded-event-title">', event.title, '</div>',
				'</div></a>', // end top area
				'<div class="embedded-event-body-area">',
				'<div class="embedded-event-type">', types_array[0], '</div>',
				'<div class="embedded-event-date">', date_string, '</div>',
				'<div class="embedded-event-location ',
				css_class_for_location, '">',
				locations_array[1], '</div>',
				'<div class="embedded-event-description">', event.body,
				'</div>',
				'<div class="embedded-event-description-more"><a href="', path, 
				'" target="_blank" alt="More information">Continue Reading</a></div>',
				'<div class="embedded-event-image">', event.field_event_poster_fid,
				'</div>',
				'</div>', '</div>'].join('');

			if(i == nodes.length-1){
				event_div = [event_div, '</div>'].join('');
			}
			
		}
		$(elementName).append(event_div);
		
		
		$("#tmpltzr .content #event-output .embedded-event a .embedded-event-top-area").hover(function() {
			gsappFetcher.log('hovering');
			
			$(this).children(".embedded-event-date-box").addClass('filled');
		}, 
		function() {
			$(this).children(".embedded-event-date-box").removeClass('filled');
		});

		
		
		
	})
	.error(function() { gsappFetcher.log('error loading event data'); $('body').removeClass('loading');})
	.complete(function() {
		safelog('events calling back');
		$('.embedded-event-description').truncate({max_length: 450});
		setTimeout(gsapp.buildWall, 100);
		if( $('body.mobile').length){
				gsapp._remove_flash_content();
				setTimeout(function () {
					gsappMobile.contentScroll.refresh();
				}, 1500);
		}else if( $('body.iscroll').length > 0 ){
			gsapp._remove_flash_content();
			setTimeout(function () {
				safelog('events timeout executed');
				//gsappMobile.contentScroll.refresh();
				gsappMobile.contentScroll.destroy();
				gsappMobile.contentScroll = null;
				gsappMobile.contentScroll = new iScroll('wrapper');
				gsappMobile.contentScroll.refresh();
				//$('body').removeClass('loading');
			}, 1500);	
		}
	}); // end getJSON
	
}



/**
 * Create HTML from JSON feed
 *
 * @param {String} url The URL for the JSON feed
 * @param {String} elementName The name of the DOM container to write into
 * @return void
 */
gsappFetcher.getFlickrWidget = function(url, elementName) {
	gsappFetcher.log('getFlickrWidget called in fetcher');

	$.getJSON(url, function(data){
		gsappFetcher.log('getFlickrWidget: received data');

		var cycle_param = data.cycle;
		var photoset = data.photoset;
		var widget_params = data.widget;
		
		// create inner div for the slides
		var inner_slideshow = $('<div class="slideshow"/>').appendTo(elementName);

		// write the photo divs into the .slideshow div
		for (i=0; i<photoset.photo.length; i++)
		{
			// check aspect and set either margin-top or margin-left
			if (photoset.photo[i].aspect > 1) {
				var inner_div = ['<div class="flickr-image ',
					widget_params.node_type, ' ', widget_params.size, 
					' ', widget_params.node_id, ' ', widget_params.group, 
					'" ><img src="', photoset.photo[i].url_o,
					'" alt="flickr-image" width="', photoset.photo[i].target_w, 
					'" height="', photoset.photo[i].target_h,
					'" style="margin-top: -', photoset.photo[i].cropdist, 'px;"', 
					'" /></div>'].join('');
			} else {
				var inner_div = ['<div class="flickr-image ',
					widget_params.node_type, ' ', widget_params.size, 
					' ', widget_params.node_id, ' ', widget_params.group, 
					'" ><img src="', photoset.photo[i].url_o,
					'" alt="flickr-image" width="', photoset.photo[i].target_w, 
					'" height="', photoset.photo[i].target_h,
					'" style="margin-left: -', photoset.photo[i].cropdist, 'px;"', 
					'" /></div>'].join('');
  		}
			var inner = [elementName, ' .slideshow'].join('');
			$(inner).append(inner_div);
			
		}
		
	var unique_tag_name = [widget_params.node_type, '-', widget_params.size, 
			'-', widget_params.node_id, '-', widget_params.group].join('');

	var next = ['<div id="next-button" class="button">',
		'<a href="#" id="', unique_tag_name, '-next',
		'">&nbsp;</a></div>'].join('');
	var prev = ['<div id="prev-button" class="button">',
		'<a href="#" id="', unique_tag_name, '-prev', '">&nbsp;</a></div>'].join('');
	$(elementName).append(next);
	$(elementName).append(prev);
	
	// append data from drupal node
	var widget_data = ['<div class="widget-data">', '<div class="widget-data-title">',
			widget_params.node_title, '</div><div class="widget-data-description">',
			widget_params.node_description, '</div></div>'].join('');
			$(elementName).append(widget_data);
	
	// build the jquery cycle script tag inline
	var cycle_tag = null;
	if (cycle_param.autostart == "1") { // autostart it (no nav)
		cycle_tag = ['<script type="text/javascript">',
			'$(document).ready(function() {', '$("', elementName, ' .slideshow").cycle({',
			'fx: "fade",', 'speed: ', cycle_param.duration, ',', 
			'slideResize: 0, containerResize: 0,',
			'});',
			'});', '</script>'].join('');
	} else { // display prev and next
		cycle_tag = ['<script type="text/javascript">',
			'$(document).ready(function() {', '$("', elementName, 
			' .slideshow").cycle({',
			'fx: "scrollLeft",', 'speed: ', cycle_param.duration, ',', 
			'slideResize: 0, containerResize: 0,',
			'timeout: 0,',
			'next: \'#', unique_tag_name,'-next\',',
			'prev: \'#', unique_tag_name, '-prev\',',
			'});',
			'});', '</script>'].join('');
	}
	
	// append script tag to DOM
	$(elementName).append(cycle_tag);
	}); // end json call

}

/**
 * Function to init the events widget carousel
 *
 * @return void
 */
gsappFetcher.eventsWidgetCarousel = function() {
	gsappFetcher.log('calling jCarousel Lite on featuredeventwidget');
	$(".tmpltzr-featuredeventwidget .featured-events-widget").jCarouselLite({
		btnNext: ".tmpltzr-featuredeventwidget .fe-next",
		btnPrev: ".tmpltzr-featuredeventwidget .fe-prev",
		speed: 300,
		visible: 1,
		scroll: 1
	});
}



/**
 * Function to return event data from JSON formatted views
 * coming from the GSAPP events site
 *
 * @param {String} url The URL for the JSON feed
 * @param {String} elementName The name of the DOM container to write into
 * @return void
 */
gsappFetcher.getEventWidget = function(url, elementName) {
	gsappFetcher.log("Widget: getting data from " + url + " into " + elementName);
	var event_div = '<div class="featured-events-widget"><div class="fe-prev"></div><div class="fe-carousel"><ul>';
	$.getJSON(url, function(data) {
		var nodes = data.nodes;
		for (var i=0; i<nodes.length;i++) {
			
			var event = nodes[i].node;
			// convert date and offset it
			var date = gsappFetcher.createDateObject(event.field_event_date_value);

			// each date has different offsets			
			var date_offset = 60000 * date.getTimezoneOffset();
			new_date = new Date(date - date_offset);
			var date_string = gsappFetcher.formatDateForWidget(new_date);

			var time_string = gsappFetcher.formatTimeForWidget(date);

			// parse locations and assign css classes for color
			var locations_array = gsappFetcher.getLocationsFromHTML(
				event.field_event_location_value);

			var css_class_for_location = 
				gsappFetcher.getCSSColorClassForLocations(
					locations_array);
			
			// parse event types
			var types_array = gsappFetcher.getEventTypesFromHTML(event.field_event_taxonomy_type_value);
			
			// get the path to the node
			// TODO UPDATE path to prod
			var path = ['http://events.gsapp.org/node/', event.nid].join('');
			

			// build the div
			event_div = [event_div, '<li class="fe-item">',
				'<div class="fe-image"><a target="_blank" class="region" href="', path, '">',
				event.field_event_poster_fid,'</a></div>',
				'<div class="fe-label">Featured Event:</div>',
				'<a target="_blank" class="region" href="', path, '">', 
				'<div class="fe-date">', date_string, '</div>',
				'<div class="fe-title">', event.title, '</div>',
				'<div class="fe-type">', types_array[0], '</div>',
				'<div class="fe-location-time-container">',
				'<span class="fe-location ',
				css_class_for_location,
				'">',
				locations_array[1],
				'</span>, ',
				'<span class="fe-time">', time_string, '</span>',
				'</div>',
				'</a>',
				'</li>'].join('');
			if(i == nodes.length-1){
				event_div = [event_div, '</ul></div><div class="fe-next"></div></div>'].join('');
			}
			
			
		}//end for loop
		gsappFetcher.log('event_div******: ' + event_div);
		$(elementName).append(event_div);
	})
	.error(function() { gsappFetcher.log('error loading event widget data'); })
	.complete(function() { 
		gsappFetcher.eventsWidgetCarousel();
		setTimeout(gsapp.buildWall, 0);
		if( $('body.mobile').length){
			gsapp._remove_flash_content();
			setTimeout(function () {
				gsappMobile.contentScroll.refresh();
			}, 1500);
		}
	}); // end getJSON
	
}


/**
 * Function to return event data from JSON formatted views
 * coming from the GSAPP events site
 *
 * @param {String} url The URL for the JSON feed
 * @param {String} elementName The name of the DOM container to write into
 * @return void
 */
gsappFetcher.getUpcomingEventsWidget = function(url, elementName) {
	gsappFetcher.log("widget: getting data from " + url + " into " + elementName);
	$.getJSON(url, function(data) {
		var nodes = data.nodes;
		var event_div = '<div class="upcoming-events-output">';
		for (var i=0; i<nodes.length;i++) {
			var event = nodes[i].node;
			// convert date and offset it
			var date = gsappFetcher.createDateObject(event.field_event_date_value);

			// each date has different offsets			
			var date_offset = 60000 * date.getTimezoneOffset();
			new_date = new Date(date - date_offset);
			var date_string = gsappFetcher.formatDateTimeOnly(new_date);

			var date_string_for_box = gsappFetcher.formatDateForWidgetBox(date);

			// parse locations and assign css classes for color
			var locations_array = gsappFetcher.getLocationsFromHTML(
				event.field_event_location_value);

			var css_class_for_location = 
				gsappFetcher.getCSSColorClassForLocations(
					locations_array);
			
			// parse event types
			var types_array = gsappFetcher.getEventTypesFromHTML(event.field_event_taxonomy_type_value);
			
			// get the path to the node
			// TODO UPDATE path to prod
			var path = ['http://events.gsapp.org/node/', event.nid].join('');
			
			// build the div
			event_div = [event_div, '<div class="embedded-event">',
				'<a target="_blank" class="region" href="', path, '">', 
				'<div class="embedded-event-top-area">',
				'<div class="embedded-event-date-box ',
				css_class_for_location, '"><div>',
				date_string_for_box, '</div></div>',
				'<div class="embedded-event-title">', event.title, '</div>',
				'</div>', // end top area
				'<div class="embedded-event-body-area">',
				'<div class="embedded-event-type">', types_array[0], '</div>',
				'<div><span class="embedded-event-location ',
				css_class_for_location, '">',
				locations_array[1],'</span>',
				'<span class="embedded-event-date">, ', date_string, 
				'</span></div></div></a></div>'].join('');

			if(i == nodes.length-1){
				event_div = [event_div, '</div>'].join('');
			}
			
		}
		$(elementName).append(event_div);
		
		
		$("#tmpltzr #upcomingeventswidget-output .embedded-event a").hover(function() {
			gsappFetcher.log('hovering');
			
			$(this).find(".embedded-event-date-box").addClass('filled');
		}, 
		function() {
			$(this).find(".embedded-event-date-box").removeClass('filled');
		});

		
		
		
	})
	.error(function() { gsappFetcher.log('error loading event data'); })
	.complete(function() {
		safelog('upcoming events widget calling back');
		setTimeout(gsapp.buildWall, 0);
	}); // end getJSON
	
}



/**
 * Function to return the current date.
 *
 * @param {String} elementName The name of the DOM container to write into
 * @return void
 */
gsappFetcher.getTodaysDate = function(elementName) {
	var objToday = new Date(),
		weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
		dayOfWeek = weekday[objToday.getDay()],
		dayOfMonth = objToday.getDate(),
		months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
		curMonth = months[objToday.getMonth()];
	var today = ['<div><div class="ac-dayOfWeek">',dayOfWeek,'</div><div class="ac-dayOfMonth">',dayOfMonth,'</div><div class="ac-month">',curMonth,'</div></div>'].join('');
	$(elementName).append(today);
}

/**
 * Function to init the CC widget carousel
 *
 * @return void
 */
gsappFetcher.ccWidgetCarousel = function() {
	gsappFetcher.log('calling jCarousel Lite for CC: widget');
	$(".tmpltzr-ccwidget .cc-widget .cc-carousel").jCarouselLite({
		btnNext: ".tmpltzr-ccwidget .cc-next",
		btnPrev: ".tmpltzr-ccwidget .cc-prev",
		speed: 300,
		circular: true,
		visible: 1,
		scroll: 1
	});
	
	$('.tmpltzr-ccwidget .cc-widget .cc-text, .tmpltzr-ccwidget .cc-widget .cc-image').bind('mouseenter', function(){
		$('.tmpltzr-ccwidget .cc-widget .cc-image img').css('opacity','0.9');
		//$('.tmpltzr-ccwidget .cc-widget .cc-text .cc-excerpt').css('color', '#0089FF');
	});
	$('.tmpltzr-ccwidget .cc-widget .cc-text, .tmpltzr-ccwidget .cc-widget .cc-image').bind('mouseleave', function(){
		$('.tmpltzr-ccwidget .cc-widget .cc-image img').css('opacity','1.0');
		//$('.tmpltzr-ccwidget .cc-widget .cc-text .cc-excerpt').css('color', 'black');
	});
}

/**
 * Function to return blog data from JSON formatted views
 * coming from CC:GSAPP
 *
 * @param {String} url The URL for the JSON feed
 * @param {String} elementName The name of the DOM container to write into
 * @return void
 */
gsappFetcher.getCCWidget = function(url, elementName) {
	gsappFetcher.log("Widget: getting CC: data from " + url + " into " + elementName);
	var post_div = '<div class="cc-widget"><div class="cc-widget-logo"></div><div class="cc-carousel"><ul>';
	$.getJSON(url, function(data) {
		var nodes = data.nodes;
		for (var i=0; i<nodes.length;i++) {
			
			var post = nodes[i].node;
			
			// get the path to the node
			// TODO UPDATE path to prod
			var path = ['http://ccgsapp.org/node/', post.nid].join('');
			

			// build the div
			post_div = [post_div, '<li class="cc-item">',
				'<div class="cc-image"><a target="_blank" href="', path, '">',
				post.field_images_fid,'</a></div>',
				'<a class="cc-text" target="_blank" href="', path, '">',
				'<span class="cc-type">', post.title, ':</span> ', 
				'<span class="cc-excerpt">', post.field_excerpt_value, '</span>',
				'</a>',
				'</li>'].join('');
			if(i == nodes.length-1){
				post_div = [post_div, '</ul></div><div class="cc-prev"></div><div class="cc-next"></div></div>'].join('');
			}
			
			
		}//end for loop
		gsappFetcher.log('post_div******: ' + post_div);
		$(elementName).append(post_div);
	})
	.error(function() { gsappFetcher.log('error loading CC: widget data'); })
	.complete(function() { 
		gsappFetcher.ccWidgetCarousel();
		setTimeout(function(){ gsapp.buildWall(); }, 0);
		if( $('body.mobile').length){
			gsapp._remove_flash_content();
			setTimeout(function () {
				gsappMobile.contentScroll.refresh();
			}, 1500);
		}
	}); // end getJSON
	
}
