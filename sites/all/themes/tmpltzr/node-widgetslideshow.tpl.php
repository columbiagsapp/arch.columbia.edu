<?php 
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
	if(!empty($terms)) {
    	foreach ($terms as $term){
        	$color = $term->name;
        }
    }   

    if($color){
		if($color == 'none'){
			$wraptext = true;
		}
	}else{
		$wraptext = true;
	}


    $theBrands = taxonomy_node_get_terms_by_vocabulary($node, 15); // vid=15 => branding
	if(!empty($theBrands)) {
		$i = 0;
    	foreach ($theBrands as $theBrand){
        	$brand[$i++] = $theBrand->name;
        }
    } 

    $small = false;
	if(!empty($node->field_width)){
		if($node->field_width[0]['view'] == 'Small'){
			$small = true;
		}
	}    
?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module<?php if($small){ print ' tmpltzr-module-240'; }else{ print ' tmpltzr-module-500'; }?> tmpltzr-widget tmpltzr-widgetslideshow node<?php if($color){ print ' '.$color; } ?><?php if($brand){ foreach($brand as $brandi){ print ' '.$brandi; } } ?><?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>

	<?php if(!empty($node->field_link[0]['url'])){ ?>
  		<a href="<?php print $node->field_link[0]['url']; ?>" target="<?php print $node->field_link[0]['attributes']['target']; ?>">
  	<?php } ?>
  	

  	<?php if(!$small){ ?>
	  	<?php if(!empty($node->field_images[0]['view'])){ ?>
	  		<div id="widget-slideshow-container-<?php print $node->nid; ?>" class="tmpltzr-widget-carousel">
	  			<div class="tmpltzr-photoset-prev"></div>
		        <div class="tmpltzr-photoset-next"></div>
	  			<ul class="widget-slideshow">
	  				<?php for($i=0;$i<count($node->field_images);$i++){ ?>
	  				<li class="tmpltzr-widget-image-item">
	  					<?php print $node->field_images[$i]['view']; ?>
	  				</li>
	  				<?php } ?>
	  			</ul>
	  		</div>
	  	<?php } ?>
	<?php }else{ ?>
		<?php if(!empty($node->field_images[0]['view'])){ ?>
	  		<div id="widget-slideshow-container-<?php print $node->nid; ?>" class="tmpltzr-widget-carousel">
	  			<div class="tmpltzr-photoset-prev"></div>
		        <div class="tmpltzr-photoset-next"></div>
	  			<ul class="widget-slideshow">
	  				<?php for($i=0;$i<count($node->field_images);$i++){ ?>
	  				<li class="tmpltzr-widget-image-item">
	  					<?php print '<img src="http://templatizer.gsappcloud.org/sites/default/files/imagecache/widget240x160scalecrop/'.$node->field_images[$i]['filename'].'" alt="" title="" class="imagecache imagecache-widget240x160scalecrop imagecache-default imagecache-widget240x160scalecrop_default" width="240" height="160" />'; ?>
	  				</li>
	  				<?php } ?>
	  			</ul>
	  		</div>
	  	<?php } ?>	  	
	<?php } ?>

	
	<div class="widget-text-wrapper">

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

  	</div>

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
<script>
	$(document).ready(function () {
		
				var id = 'widget-slideshow-container-' + <?php print $node->nid; ?>;
				var selector = '#'+id;
				var next = '#'+id+' .tmpltzr-photoset-next';
				var prev = '#'+id+' .tmpltzr-photoset-prev';
				
				$(selector).jCarouselLite({
					btnNext: next,
					btnPrev: prev,
					auto: <?php if($node->field_autoscroll_time[0]["view"] == '0'){ print null; }else{ print $node->field_autoscroll_time[0]["view"]; } ?>,
					speed: 700,
					circular: true,
					visible: 1,
					scroll: 1
				});
			
	});
</script>
</div> <!-- /.node -->

