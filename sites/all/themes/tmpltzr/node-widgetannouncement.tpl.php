<?php
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
	if(!empty($terms)) {
    	foreach ($terms as $term){
        	$color = $term->name;
        }
    }   

    $theBrands = taxonomy_node_get_terms_by_vocabulary($node, 15); // vid=15 => branding
	if(!empty($theBrands)) {
		$i = 0;
    	foreach ($theBrands as $theBrand){
        	$brand[$i++] = $theBrand->name;
        }
    }     
?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240 tmpltzr-widget tmpltzr-widgetannouncement node<?php if($color){ print ' '.$color; } ?><?php if($brand){ foreach($brand as $brandi){ print ' '.$brandi; } } ?><?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>

	<?php if(!empty($node->field_link[0]['url'])){ ?>
  		<a href="<?php print $node->field_link[0]['url']; ?>" target="_blank">
  	<?php } ?>
  	
  	<?php if(!empty($node->field_widget_image[0]['view'])){ ?>
  		<div class="tmpltzr-widget-image">
  			<?php print $node->field_widget_image[0]['view']; ?>
  		</div>
  	<?php } ?>
	
	<?php if(!empty($node->field_title[0]['view'])){ ?>
  		<h4>
  			<?php print $node->field_title[0]['view']; ?>
  		</h4>
  	<?php } ?>

  	<?php if(!empty($node->field_body[0]['view'])){ ?>
  		<div class="tmpltzr-widget-body">
  			<?php print $node->field_body[0]['view']; ?>
  		</div>
  	<?php } ?>

  	<?php if(!empty($node->field_link[0]['url'])){ ?>
  		</a>
  	<?php } ?>

  	<?php if($brand){
  		
  		foreach($brand as $brandi){
	  		switch($brandi){
	  			case 'buell':
	  				print '<div class="widget-brand buell"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/buell-widget-brand.png" /></div>';
	  				break;
	  			case 'studio-x':
	  				if($color){
	  					switch($color){
	  						case 'north-america':
				  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/studio-x-north-america-brand.png" /><span class="widget-brand-text">Studio-X<br />NYC</span></div>';
				  				break;
				  			case 'latin-america':
				  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/studio-x-latin-america-brand.png" /><span class="widget-brand-text">Studio-X<br />Rio de Janiero</span></div>';
				  				break;
				  			case 'south-asia':
				  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/studio-x-south-asia-brand.png" /><span class="widget-brand-text">Studio-X<br />Mumbai</span></div>';
				  				break;
				  			case 'middle-east':
				  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/studio-x-middle-east-brand.png" /><span class="widget-brand-text">Amman<br />Lab</span></div>';
				  				break;
				  			case 'asia':
				  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/studio-x-asia-brand.png" /><span class="widget-brand-text">Studio-X<br />Beijing</span></div>';
				  				break;
				  			case 'europe':
				  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/studio-x-europe-brand.png" /></div>';
				  				break;
				  			case 'africa':
				  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/studio-x-africa-brand.png" /><span class="widget-brand-text">Studio-X<br />Johanneseburg</span></div>';
				  				break;
				  			default:
				  				break;
				  		}
		  			}
	  				break;
	  			case 'experiments-in-motion':
	  				print '<div class="widget-brand"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/eim-brand.png" /></div>';
	  				break;
	  			case 'cure':
	  				break;
	  			case 'collecting-architecture':
	  				break;
	  			case 'alumni':
	  				break;
	  			default:
	  				break;
	  		}
	  	}
  		
  	}?>


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->

