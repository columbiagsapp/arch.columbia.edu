<?php 
function printEditPageHeader() 
{ 
	if ($user->uid == 1 || $user->uid == 4 || $user->uid == 5 || $user->uid == $node->uid) { ?>
		print '<div class="tmpltzr-edit"><a href="http://postfog.org/templatizer/node/<?php print $node->nid; ?>/edit" title="<?php print $node_url; ?>">EDIT THIS PAGE</a></div>';
	}
} 
?>

