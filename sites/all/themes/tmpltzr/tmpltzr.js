var copyPaste = function(){
	var view = $('#tmpltzr').html();
  view = '<textarea>' + '<div id="tmpltzr">' + view + '</div><!-- /#tmpltzr -->' + '</textarea>';
  $('#copy-paste').append(view);
}


$(document).ready(function() {
  
	setTimeout(copyPaste, 2000);
  
  
});