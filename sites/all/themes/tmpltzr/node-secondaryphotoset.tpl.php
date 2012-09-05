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
<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module <?php if($small){ print 'tmpltzr-module-240 tmpltzr-secondary-float'; }else{ print 'tmpltzr-module-500'; } ?> tmpltzr-secondary tmpltzr-secondaryphotoset node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
<?php } ?>
	
	<?php if(!empty($node->field_images)){ ?>
		<div class="tmpltzr-photoset-container">
        <div class="tmpltzr-photoset-prev"></div>
        <div class="tmpltzr-photoset-next"></div>
  			<ul id="tmpltzr-photoset-<?php print $node->nid; ?>" class="tmpltzr-photoset">
  			<?php $count = 0; ?>
  			<?php foreach($node->field_images as $photo){ ?>
  				<li class="tmpltzr-image <?php echo 'image-'.$count; ?>">
  				<?php print $photo['view']; ?>
  				</li>
  				<?php $count = $count + 1; } ?>
  			</ul>
  		</div>
  	<?php } ?>
  	
  	<?php if(!empty($node->field_title)){ ?>
  		<h2>
  			<?php print $node->field_title[0]['view']; ?>
  		</h2>
  	<?php } ?>
	
	<?php if(!empty($node->field_body)){ ?>
  		<div class="tmpltzr-body">
  			<?php print $node->field_body[0]['view']; ?>
  		</div>
  	<?php } ?>
  	

<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->