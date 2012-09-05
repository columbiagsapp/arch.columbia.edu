var copyPaste = function(){
	var $t = $('#tmpltzr');

	$t = $t.not('#eventwidget-output div, #cc-output div, #tumblr-results div');

  var view = $t.html();
	
  view = '<textarea>' + '<div id="tmpltzr">' + view + '</div><!-- /#tmpltzr -->' + '</textarea>';
  $('#copy-paste').append(view);
}


$(document).ready(function() {
	$('#copy-paste h4').bind('click', copyPaste);
});