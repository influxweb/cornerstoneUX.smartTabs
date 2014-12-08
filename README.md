cornerstoneUX.smartTabs
=======================

A jQuery plug-in to control tab/accordion functions primarily for responsive sites.

### The What?

smartTabs is a jQuery plug-in you can use to add tabbed, accordion, and/or responsive tabbed/accordion content sections to your site. This is the first building block to be added to the [cornerstoneUX](https://github.com/influxweb/cornerstoneUX "cornerstoneUX Development Architecture") architecture. Unlike add-ons for other frameworks and architectures, smartTabs can be used on any site by adding the style-sheets provided with the download. There is no limit to the number of content sections you can call on a page.

### The Why?

After searching for a good solution to turn tabbed content into usable, accordion content within a responsive site, I decided it was time to try my hand at creating my own version. Taking my lead from mobile-first as well as regression for no CSS or JavaScript, I built smartTabs around using definition lists for the HTML structure. The style-sheet provides some basic formatting for the tabs and accordion structures. All the of the heavy-lifting is provided by the plug-in. It structures and provides the necessary navigation as well as the responsive conversion between tabs and accordions.

### Plug-In Options

<table class="table-border table-stripe">
	<thead>
		<tr>
			<th>Property</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>activeClass</td>
			<td>'current'</td>
			<td>This is the class applied to the currently active tab or accordion.</td>
		</tr>
		<tr>
			<td>breakpoint</td>
			<td>768</td>
			<td>This is the breakpoint at which you would like the tabs to convert to accordions when using them in a responsive environment.</td>
		</tr>
		<tr>
			<td>breakTrigger</td>
			<td>$(window)</td>
			<td>A selector or DOM element that you would like to test the "outerWidth" of against the "breakpoint" specified.</td>
		</tr>
		<tr>
			<td>contentHeight</td>
			<td>'fixed'</td>
			<td>This is how you would like to content height to behave. Choose from `'fixed'` to have the content fixed to the height of the largest block or `'auto'` to have the content automatically adjust to the height of each block.</td>
		</tr>
		<tr>
			<td>layout</td>
			<td>'auto'</td>
			<td>The type of layout you would like your content to have. Choose from `'tabs'` to have a fixed tab layout, `'accordion'` to have a fixed accordion layout, or `'auto'` to have a responsive tab to accordion layout.</td>
		</tr>
	</tbody>
</table>

### Installation

To install smartTabs is real easy. Just add a link to the `smartTabs.css` file in the `HEAD` of your page. Add a link to the `jquery.smartTabs.js` file below your link to jQuery, and add the initialization string to your page or external JavaScript file. If you are not using the [cornerstoneUX](https://github.com/influxweb/cornerstoneUX "cornerstoneUX Development Architecture") architecture, you may want to use the alternate `smartTabs--alt.css` file which includes some basic structure resets.

### Examples

[http://influxweb.github.io/cornerstoneUX.smartTabs/](http://influxweb.github.io/cornerstoneUX.smartTabs/)