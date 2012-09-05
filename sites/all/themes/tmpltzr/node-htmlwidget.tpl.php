<?php
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
	if(!empty($terms)) {
		foreach ($terms as $term){
			$color = $term->name;
		}
	}    
	
	$small = false;
	if(!empty($node->field_width)){
		if($node->field_width[0]['view'] == 'Small'){
			$small = true;
		}
	}

?>

<?php if (!$page){ ?>
<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module <?php if($small){ print 'tmpltzr-module-240'; }else{ print 'tmpltzr-module-500'; } ?> tmpltzr-widget tmpltzr-htmlwidget node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
<?php } ?>
	
	<?php if(!empty($node->field_html)){ ?>
  		<div class="htmlwidget-html">
  			<?php print $node->field_html[0]['view']; ?>
  		</div>
  	<?php } ?>
  	
<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->