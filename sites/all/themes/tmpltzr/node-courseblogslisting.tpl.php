<?php printEditPageHeader($user->uid, $node->uid, $node->nid, $node_url); ?>

<div id="fixed-header" class="course-blog-listing-page">
	<h1><?php print $title; ?></h1>



<?php 
	function applyRegionClass($term){
		switch($term){
			case 'Africa':
				return 'africa';
				break;
			case 'North America':
				return 'north-america';
				break;
			case 'Latin America':
				return 'latin-america';
				break;
			case 'Europe':
				return 'europe';
				break;
			case 'Middle East':
				return 'middle-east';
				break;
			case 'South Asia':
				return 'south-asia';
				break;
			case 'Asia':
				return 'asia';
				break;
			case 'Other':
				return 'other';
				break;
			default:
				return 'none';
				break;
			
		}
	}

	$semesters = taxonomy_node_get_terms_by_vocabulary($node, 14); // vid=14 => Year and Semester
	
	foreach ($semesters as $semester){
		if(!empty($semester)) {
			$start = strlen($semester->name) - 4;
			$year = substr($semester->name , $start);
			$term = substr($semester->name , 0, $start - 1);

			if($term == 'Fall'){
				$semesterArray[$year][0] = $term;
			}elseif($term == 'Summer'){
				$semesterArray[$year][1] = $term;
			}elseif($term == 'Spring'){
				$semesterArray[$year][2] = $term;
			}
		}
	}
	krsort($semesterArray);//key sort: invert the order by key so that the most recent year comes first

?>

	<div id="program-list" class="filter-list">	
		<h4>By Program:</h4>
		<div>
			<ul class="term-list">
				<?php //list of Programs
		    		$programs = taxonomy_get_tree(10); // vid=10 => program

		    		$programsHalf = count($programs);
					$programsHalf = ceil($programsHalf/2);

					if(!empty($programs)) {
						$i = 0;
	        			foreach ($programs as $term){
	        				if($i == $programsHalf){
	        					print '</ul><ul class="term-list">';
	        				}
	        				$cleanTerm = str_replace(" ", "-", $term->name);
	            			$cleanTerm = str_replace("/", "", $cleanTerm);
	            			print '<li><a class="term-index-term" id="' .$cleanTerm. '">' . $term->name . '</a></li>';
	            			$i++;
	  		          	}
	    	    	}       
				?>
			</ul><!-- .term-list -->
		</div>
	</div><!-- #program-list -->
	<div id="region-list" class="filter-list">	
		<h4>By Region:</h4>
		<div>
			<ul class="term-list">
				<?php //list of Programs
		    		$regions = taxonomy_get_tree(12); // vid=12 => region

		    		$regionsHalf = count($regions);
					$regionsHalf = ceil($regionsHalf/2);

					if(!empty($regions)) {
						$i = 0;
	        			foreach ($regions as $term){
	        				if($i == $regionsHalf){
	        					print '</ul><ul class="term-list">';
	        				}
	            			print '<li><a class="term-index-term ' . applyRegionClass($term->name) .'" id="'.applyRegionClass($term->name).'">' . $term->name . '</a></li>';
	  		          		$i++;
	  		          	}
	    	    	}else{
	    	    		print '<li>No terms</li>';
	    	    	}    
				?>
				
			</ul><!-- .term-list -->
		</div>
		<div id="x-affiliation"><span class="x-affiliated"><img src="http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/xGrey.png" width="6" height="6" /></span>Studio-X Affiliation</div>
	</div><!-- #region-list -->

<?php /*
	<div id="semester-list" class="filter-list">
		<h4>Semester:</h4>
		<ul class="term-list">
			<?php 
				$i = 0;
				foreach($semesterArray as $semYear => $sem){
					foreach($sem as $semTerm){
						if( ($i == $halfSemCount) || ($i == $halfSemCount*2) ){
							print '</ul><ul class="term-list">';
						}
						
						print '<li><a class="term-index-term" href="#'.$semTerm.'-'.$semYear.'">' . $semTerm . ' ' . $semYear . '</a></li>';
						$i++;
					}
				}
			?>
		</ul><!-- .term-list -->
	</div><!-- /#semester-list -->
*/ ?>
	
	
	
	
	
	
</div><!-- #fixed-header -->
	





<div id="course-blogs-index-listing">
	<?php
	$semesters = taxonomy_node_get_terms_by_vocabulary($node, 14); // vid=14 => Year and Semester

	foreach ($semesters as $semester){
		if(!empty($semester)) {
			$start = strlen($semester->name) - 4;
			$year = substr($semester->name , $start);
			$term = substr($semester->name , 0, $start - 1);

			if($term == 'Fall'){
				$semesterArray[$year][0] = $term;
			}elseif($term == 'Summer'){
				$semesterArray[$year][1] = $term;
			}elseif($term == 'Spring'){
				$semesterArray[$year][2] = $term;
			}
		}
	}
	krsort($semesterArray);//key sort: invert the order by key so that the most recent year comes first

	foreach($semesterArray as $semYear => $sem){
		foreach($sem as $semTerm){
			print '<h4 id="'.$semTerm."-".$semYear.'">'.$semTerm." ".$semYear.'</h4>';
			print views_embed_view('courseblogs', 'page_1', $semYear, $semTerm);
		}
	}

	?>
	
</div>






