# Updating the GSAPP Website

## Tools

We suggest using [Sublime Text 2](http://www.sublimetext.com/2) for all text editing. We have built a proxy site called Templatizer that is used to draft content for the live site.



### Creating Content on Templatizer

1.	Create a Page Wrapper by going to Content Management > Create Content > Page Wrapper (if the green menu persists, reload the page)
	*	title will only show up in backend
	*	Page Title is what the user will see
	*	Give menu title name and position in menu
2.	Create primary content with primary full, half, quarter, etc. and order with Order field and set parent to the Page Wrapper
3.	Create secondary content with secondary content types (and order) and set parent to the Page Wrapper
4.	If the menu is in the wrong position, visit http://templatizer.gsappcloud.org/admin/build/menu-customize/primary-links




### Migrating Content to Existing Page

1.	Log in to arch.columbia.edu and open the page you want to update
2.	Click edit
3.	Open the corresponding templatizer page in a browser with Javascript turned off (and make sure you are logged out of templatizer)
4.	Copy the page source
5.	Copy only the html between the <!--endtmpltzr--> and <!--starttmpltzr--> tags
6.	Paste this html into the text field on the arch.columbia.edu backend and hit save




### Creating New Page on Live Site
1.	http://www.arch.columbia.edu/node/add/page
2.	Give the page a title (won't be visible, only for the backend)
3.	Paste the Templatizer html code into the text field
4.	Set the menu title and position
5.	Check the Published checkbox in the Publishing Options group
6.	Check WIND Settings if you want to limit to UNI access only
7.	Save
8.	Check the menu position, if you need to move it, go to http://www.arch.columbia.edu/admin/build/menu-customize/primary-links

