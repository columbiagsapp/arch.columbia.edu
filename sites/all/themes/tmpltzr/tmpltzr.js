var copyPaste = function(){

	var view = $('#tmpltzr').html();
	
  console.log('copypaste - view: ' + view);
  
  view = '<textarea>' + '<div id="tmpltzr">' + view + '</div><!-- /#tmpltzr -->' + '</textarea>';
  $('#copy-paste').append(view);
}


$(document).ready(function() {
  
	setTimeout(copyPaste, 2000);
  
  
});