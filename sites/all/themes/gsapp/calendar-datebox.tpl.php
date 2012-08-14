<?php
// $Id: calendar-datebox.tpl.php,v 1.2.2.2 2008/06/10 16:05:16 karens Exp $
/**
 * @file 
 * Template to display the date box in a calendar.
 *
 * - $view: The view.
 * - $granularity: The type of calendar this box is in -- year, month, day, or week.
 * - $mini: Whether or not this is a mini calendar.
 * - $class: The class for this box -- mini-on, mini-off, or day.
 * - $day:  The day of the month.
 * - $date: The current date, in the form YYYY-MM-DD.
 * - $link: A formatted link to the calendar day view for this day.
 * - $url:  The url to the calendar day view for this day.
 * - $selected: Whether or not this day has any items.
 * - $items: An array of items for this day.
 */
?> 

<?php 
$link_attr = array();
if($_GET['mini']){
	$link_attr = array('query'=>'mini='.$_GET['mini']);
}

$link = l($day,$url,$link_attr);?>
<div class="<?php print $granularity ?> <?php print $class; ?>"> <?php print $link; ?> </div>