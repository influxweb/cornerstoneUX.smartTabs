/*
                              __ ______      __             _     
   _________ ___  ____ ______/ //_  __/___ _/ /_  _____    (_)____
  / ___/ __ `__ \/ __ `/ ___/ __// / / __ `/ __ \/ ___/   / / ___/
 (__  ) / / / / / /_/ / /  / /_ / / / /_/ / /_/ (__  )   / (__  ) 
/____/_/ /_/ /_/\__,_/_/   \__//_/  \__,_/_.___/____(_)_/ /____/  
                                                     /___/        

A jQuery plug-in to control tab/accordion functions primarily for responsive sites.

cornerstoneUX.smartTabs Plug-In
Version: 2.0.0
Author: Matt Zimmermann
Website & Documentation: http://influxweb.github.io/cornerstoneUX.smartTabs/
Repo: https://github.com/influxweb/cornerstoneUX.smartTabs
Issues: https://github.com/influxweb/cornerstoneUX.smartTabs/issues
License: MIT
*/
;(function($){
	if (!$.cornerstoneUX) {
		$.cornerstoneUX = {};
	};

	$.cornerstoneUX.smartTabs = function(el, options){
		var base = this;
		
		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// Add a reverse reference to the DOM object
		base.$el.data('cornerstoneUX.smartTabs', base);
		
		base.viewport = $(window).outerWidth();
		base.ddHeight = '';
		
		base.init = function () {
			base.options = $.extend({},$.cornerstoneUX.smartTabs.defaultOptions, options);
			
			if ((base.viewport <= base.options.breakpoint && base.options.layout == 'auto') || base.options.layout == 'accordion') {
				base.$el.addClass('accordion');
			}
			else if ((base.viewport > base.options.breakpoint && base.options.layout == 'auto') || base.options.layout == 'tabs') {
				base.$el.addClass('tabs');
			};
			
			base.ddHeight = [];

			base.$el.each(function () {
				var smartTabs = $(this),
					smartTabsHeight = smartTabs.find('dt').outerHeight(),
					currentHeight = 0,
					current,
					hash = location.hash;
				
				if (base.$el.hasClass('tabs')) {
					if (base.options.contentHeight == 'fixed') {
						smartTabs.find('dd').each(function (i) {
							var dd = $(this);
							
							dd.addClass('invisible');
							if (dd.outerHeight() > currentHeight) {
								currentHeight = dd.outerHeight();
							};
							dd.removeClass('invisible');
						});
						smartTabs.css('height', smartTabsHeight + currentHeight + 'px');
						smartTabs.find('dd').css('height', currentHeight + 'px');
						console.log(currentHeight);
					}
					else if (base.options.contentHeight == 'auto') {
						smartTabs.find('dd').each(function (i) {
							var dd = $(this);
							
							dd.addClass('invisible');
							base.ddHeight[i] = dd.outerHeight();
							dd.removeClass('invisible');
						});
					};
					smartTabs.find('dd').css('top', smartTabsHeight + 'px');
				}
				else {
					smartTabs.css('height', 'auto');
					smartTabs.find('dd').css({
						height: 'auto',
						top: 0
					});
				};
				smartTabs.find('dt').removeClass('current');
				smartTabs.find('dd').hide();
				
				if (smartTabs.find('dt a[href="' + hash + '"]').length) {
					if (base.$el.hasClass('tabs') && base.options.contentHeight == 'auto') {
						var findCurrent = smartTabs.find('a[href="' + hash + '"]').parent().addClass('current').next('dd'),
							i = findCurrent.index('dd');
							
						smartTabs.css('height', smartTabsHeight + base.ddHeight[i] + 'px');
						current = findCurrent.css('height', base.ddHeight[i] + 'px').show();
					}
					else {
						current = smartTabs.find('a[href="' + hash + '"]').parent().addClass('current').next('dd').show();
					};
				}
				else {
					if (base.$el.hasClass('tabs') && base.options.contentHeight == 'auto') {
						var findCurrent = smartTabs.find('dt:first').addClass('current').next('dd'),
							i = findCurrent.index('dd');
							
						smartTabs.css('height', smartTabsHeight + base.ddHeight[i] + 'px');
						current = findCurrent.css('height', base.ddHeight[i] + 'px').show();
					}
					else {
						current = smartTabs.find('dt:first').addClass('current').next('dd').show();
					};
				};
			});
		};
		
		base.navigation = function () {
			base.$el.on('click', 'dt a', function (e) {
				var smartTabs = $(this),
					smartTabsHeight = smartTabs.parent('dt').outerHeight();
				
				e.stopPropagation();
				e.preventDefault();
				e.stopImmediatePropagation();
				if (base.$el.hasClass('accordion')) {
					if (smartTabs.parent('dt').hasClass('current')) {
						var current = smartTabs.parent('dt').removeClass('current').next('dd').slideUp(300);
					}
					else {
						smartTabs.parents('dl').find('.current').removeClass('current').next('dd').hide();
						var current = smartTabs.parent('dt').addClass('current').next('dd').slideDown(300);
						current.animate({scrollTop: -smartTabs.parent('dt').outerHeight()}, 800);
					};
				}
				else {
					if (!smartTabs.parent('dt').hasClass('current')) {
						if (base.options.contentHeight == 'auto') {
							smartTabs.parents('dl').find('.current').removeClass('current').next('dd').hide();
							
							var findCurrent = smartTabs.parent('dt').addClass('current').next('dd'),
								i = findCurrent.index('dd'),
								current = findCurrent.css('height', base.ddHeight[i] + 'px').fadeIn();
								
							smartTabs.parents('dl').css('height', smartTabsHeight + base.ddHeight[i] + 'px');
						}
						else {
							smartTabs.parents('dl').find('.current').removeClass('current').next('dd').hide();
							var current = smartTabs.parent('dt').addClass('current').next('dd').show();
						};
					};
				};
			});
		};

		base.resize = function () {
			base.viewport = $(window).outerWidth();
			if (base.viewport <= base.options.breakpoint && base.options.layout == 'auto') {
				base.$el.removeClass('tabs');
				base.$el.addClass('accordion');
			}
			else if (base.viewport > base.options.breakpoint && base.options.layout == 'auto') {
				base.$el.removeClass('accordion');
				base.$el.addClass('tabs');
			};
			base.init();
		};
		
		// Run Functions
		base.init();
		base.navigation();
		$(window).on('resize', function () {
			base.resize();
		});
	};
	
	$.cornerstoneUX.smartTabs.defaultOptions = {
		activeClass: 'current',
		breakpoint: 768,
		breakTrigger: $(window),
		contentHeight: 'fixed',
		layout: 'auto'
	};
	
	$.fn.smartTabs = function(options){
		return this.each(function(){
			(new $.cornerstoneUX.smartTabs(this, options));
		});
	};
	
	// This function breaks the chain, but returns
	// the smartTabs if it has been attached to the object.
	$.fn.getcornerstoneUX_smartTabs = function(){
		this.data('cornerstoneUX.smartTabs');
	};
})(jQuery);
