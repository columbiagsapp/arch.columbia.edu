<?php
  $terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
  if(!empty($terms)) {
    foreach ($terms as $term){
      $color = $term->name;
    }
  }    
  
  $small = true;
  if(!empty($node->field_width)){
    if($node->field_width[0]['view'] == 'Large'){
      $small = false;
    }
  }

?>
<?php if (!$page){ ?>
<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module <?php if($small){ print 'tmpltzr-module-240 tmpltzr-secondary-float'; }else{ print 'tmpltzr-module-500'; } ?> tmpltzr-secondary tmpltzr-secondaryquote node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
<?php } ?>
	
	<?php if(!empty($node->field_quote)){ ?>
  		<div class="tmpltzr-quote">
  			<?php print $node->field_quote[0]['view']; ?>
  		</div>
  	<?php } ?>
  	

<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->