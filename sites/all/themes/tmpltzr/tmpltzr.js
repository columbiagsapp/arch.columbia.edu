var copyPaste = function(){

	
	var
		contentSelector = '#content',
		$content = $(contentSelector),
		ContentNode,
		url = document.URL,
		$body = $(document.body);
		
	$.ajax({
		url: url,
		dataType: "text",
		success: function(data, textStatus, jqXHR){	
			// Prepare
			var $data = $(data),
			$dataContent,
			$scripts;

			$dataContent = $data.find(contentSelector).filter(':first');
			
			$scripts = $dataContent.find('.document-script');
			if ( $scripts.length ) {
				$scripts.detach();
			}

			// Add the scripts
			$scripts.each(function(i){
				var $script = $(this),
					scriptText = $script.text();
					console.log('scriptText (i): ('+i+'): '+ scriptText);
			/*
				if( $('body').hasClass('IE') ){
					var ss = document.createElement('script');
					var scr = scriptText;
					ss.text = scr;
					var hh = document.getElementsByTagName('head')[0];
					hh.appendChild(ss);
				}else{
					var scriptNode = document.createElement('script');
					scriptNode.appendChild(document.createTextNode(scriptText));
					ContentNode.appendChild(scriptNode);
				}*/
			});

			contentHtml = $data.find('#tmpltzr').html();

			console.log('$contentHtml TCT************:'+contentHtml);
			
		},
		error: function(jqXHR, textStatus, errorThrown){
			contentHtml = "ERROR: caught, unknown";
		},
		complete: function(jqXHR, textStatus){
			contentHtml = '<textarea>' + '<div id="tmpltzr">' + contentHtml + '</div><!-- /#tmpltzr -->' + '</textarea>';
		  	$('#copy-paste').append(contentHtml);
		}
	}); // end ajax
  
}


var copyPaste1 = function(){
	$.getScript(document.URL, function(data, textStatus, jqxhr) {
	   console.log(data); //data returned
	   console.log(textStatus); //success
	   console.log(jqxhr.status); //200
	   console.log('Load was performed.');
	});
}

var copyPaste2 = function(){
  var jqxhr = $.get(document.URL, function(data) {
    // Prepare
			var $data = $(data);
		

			contentHtml = $data.find('#tmpltzr').html();

			console.log('$contentHtml TCT************:'+contentHtml);
  })
  .success(function() { 
  	
  })
  .error(function() { alert("error"); })
  .complete(function() { 
  	contentHtml = '<textarea>' + '<div id="tmpltzr">' + contentHtml + '</div><!-- /#tmpltzr -->' + '</textarea>';
		  	$('#copy-paste').append(contentHtml);
   });


}

$(document).ready(function() {
	$('#copy-paste h4').bind('click', copyPaste);
});