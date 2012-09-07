<?php
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
		if(!empty($terms)) {
        	foreach ($terms as $term){
            	$color = $term->name;
            }
        }      
?>
<?php if (!$page){ ?>
<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240 tmpltzr-widget tmpltzr-followwidget node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
<?php } ?>
	
	<div class="follow-text">Follow us: <span class="follow-hover-text"></span></div>
	<div class="follow-links">
		<div class="follow-links-row">
			<a id="follow-twitter" href="https://twitter.com/#!/gsapponline" target="_blank"></a>
			<a id="follow-facebook" href="https://www.facebook.com/gsapp1881" target="_blank"></a>
			<a id="follow-linkedin" href="http://www.linkedin.com/groups?home=&gid=2188862&trk=anet_ug_hm" target="_blank"></a>
			<a id="follow-issuu" href="http://issuu.com/gsapponline" target="_blank"></a>
			<a id="follow-flickr" href="http://www.flickr.com/photos/gsapponline" target="_blank"></a>
			<a id="follow-cc" href="http://ccgsapp.org/" target="_blank"></a>
		</div><br >
		<div class="follow-links-row">
			<a id="follow-youtube" href="http://www.youtube.com/user/ColumbiaGSAPP" target="_blank"></a>
			<a id="follow-vimeo" href="https://vimeo.com/user11152188" target="_blank"></a>
			<a id="follow-livestream" href="http://www.livestream.com/gsapp" target="_blank"></a>
			<a id="follow-itunes" href="http://itunes.apple.com/itunes-u/spring-2012-gsapp-lectures/id499345704?mt=10" target="_blank"></a>
		</div>
	</div>
  	
<script type="text/javascript">
	var hoverOnFollowUs = function(){
		var channel = $(this).attr('id');
		var text = '';
		switch(channel){
			case 'follow-twitter':
				text = 'Twitter';
				break;
			case 'follow-facebook':
				text = 'Facebook';
				break;
			case 'follow-linkedin':
				text = 'LinkedIn';
				break;
			case 'follow-issuu':
				text = 'Issuu';
				break;
			case 'follow-flickr':
				text = 'Flickr';
				break;
			case 'follow-cc':
				text = 'CC:GSAPP Blog';
				break;
			case 'follow-youtube':
				text = 'Youtube';
				break;
			case 'follow-vimeo':
				text = 'Vimeo';
				break;
			case 'follow-livestream':
				text = 'Livestream';
				break;
			case 'follow-itunes':
				text = 'iTunes U';
				break;
			
			default:
				break;
		}
		$('.follow-hover-text').text(text);
	}
	var hoverOffFollowUs = function(){
		$('.follow-hover-text').text('');
	}
	$(document).ready(function() {
	  $('#follow-twitter, #follow-facebook, #follow-linkedin, #follow-issuu, #follow-flickr, #follow-cc, #follow-youtube, #follow-vimeo, #follow-livestream, #follow-itunes').bind('mouseenter', hoverOnFollowUs).bind('mouseleave', hoverOffFollowUs);
	});
</script>
<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->