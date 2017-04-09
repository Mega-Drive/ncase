// JavaScript Document

/*****************************************

[Table of Contents]

0. Preloader
1. Inits
2. Height
3. Custom Scrollbar
4. Letter
5. Main Menu
6. Slider
7. SvgOne
8. ProgressBar
9. Footer
10. Top Arrow
11. Services Browse Button
12. YouTube Video Background

*****************************************/

$(document).ready(function()
{
	"use strict";

	/* --- 0. Preloader ---*/

	setTimeout(function(){
		$('body').addClass('loaded');
	}, 3000);

	/* --- 1. Inits --- */

	var pBarInfo = [];
	var skillBars = [];
	var scrollPosition = 0;

	initHeight();
	initScrollbar();
	initLetter();
	initMainMenu();
	initSlider();
	initSvgOne();
	initProgressBars();
	initFooter();
	initTopArrow();
	initBrowseButton();
	
	window.onresize = function()
	{
		initHeight();
		initLetter();
		initSvgOne();
		initFooter();
		reMainMenu();
		reSocial();
	};
	
	/* --- 2. Height --- */

	function initHeight()
	{
		// Initializes height for the hero section. It is adding up first two sections
		// together in order to achieve the effect where hero sections lifts
		// over the rest of the page. About us section has a fixed positioning
		// until scrolled down to it.
		var block1Container = document.getElementById('hero_block_container');
		var block1 = document.getElementById('hero_block').scrollHeight;
		var block2 = document.getElementById('about_block_container').scrollHeight;
		
		var finalHeight = block1 + block2;
		block1Container.style.height = (finalHeight) + "px";
	}

	/* --- 3. Custom Scrollbar --- */

	function initScrollbar()
	{
		var ele = document.getElementById('hero_block');
		var stats_array = [];
		var pbar_array = [];
		$('.stats_counter').each(function()
		{
			stats_array.push(true);
		});

		$('.skill_bars').each(function()
		{
			pbar_array.push(true);
		});

		$(".container").mCustomScrollbar(
		{
			scrollbarPosition: "outside",
			theme:"minimal-dark",
			scrollInertia: 500,
			mouseWheel:{ scrollAmount: 200 },
			callbacks:
			{
				whileScrolling:function()
				{
					scrollPosition = Math.abs(this.mcs.top);
					myCustomFn(this);
					triggerStats();
					triggerPBars();
				}
			}
		});
		
		function triggerPBars()
		{
			var wH = window.innerHeight;

			$('.skill_bars').each(function(i)
			{
				var ele = $(this);
				var distanceTop = ele.offset().top - wH;

				if(pbar_array[i])
				{
					if(distanceTop < 0)
					{
						skillBars[i].animate(pBarInfo[i].pbPerc);
						pbar_array[i] = false;
					}
				}
			});
		}

		function triggerStats()
		{
			var wH = window.innerHeight;

			$('.stats_counter').each(function(i)
			{
				var ele = $(this);
				var distanceTop = ele.offset().top - wH;
				var elementValue = ele.text();
				var elementEndValue = ele.data('end-value');

				if(stats_array[i])
				{
					if(distanceTop < 0)
					{
						var counter = {value:elementValue};
						TweenMax.to(counter, 4,
						{
							value:elementEndValue, 
							roundProps:"value", 
							ease: Circ.easeOut, 
							onUpdate:function()
							{
								document.getElementsByClassName('stats_counter')[i].innerHTML = counter.value;
							}
						});
						stats_array[i] = false;
					}
				}
			});
		}
		
		function myCustomFn(el)
		{
			var height = el.mcs.top;
			var toTop = Math.abs(height);
			var eleHeight = ele.scrollHeight;
			var about = document.getElementById('about_block_container');
			var aboutOverlay = document.getElementById('about_block_color_overlay');
			var hamburger = $('.menu_container');
			var logoContainer = $('.logo_container');
			var logo = $('.logo a');
			var skillsPos = $('#skills_block').position().top - 60;
			var skillsHeight = $('#skills_block').innerHeight() + skillsPos;
			var servicesPos = $('#services_block').position().top - 60;
			var servicesHeight = $('#services_block').innerHeight() + servicesPos;
			var projectsPos = $('#projects_block').position().top - 60;
			var projectsHeight = $('#projects_block').innerHeight() + projectsPos;
			var clientsPos = $('#clients_block').position().top - 60;
			var clientsHeight = $('#clients_block').innerHeight() + clientsPos;
			var teamPos = $('#team_block').position().top - 60;
			var teamHeight = $('#team_block').innerHeight() + teamPos;

			//alert(skillsPos + " " + skillsHeight);

			if(toTop >= eleHeight - 450)
			{
				// prevents hover effect for the about us image until you scroll
				// more than 450px down
				$('#svg_1_image').css('pointer-events', "auto");
			}
			else
			{
				$('#svg_1_image').css('pointer-events', "none");
			}

			if(toTop >= eleHeight)
			{
				document.getElementById('hero_block_container').style.height = "100vh";
				about.className = "content_relative";
				hamburger.addClass('menu_container_fixed');
				aboutOverlay.style.display = 'none';
				$('.menu_line').css('background', "#000000");
				$('#arrow_top').css('visibility', "visible");
				$('#arrow_top').css('opacity', "1");
				addActive($('#menu_about'));
				logoContainer.addClass('logo_fixed');
				logo.removeClass('logo_white');
				logo.addClass('logo_black');
			}
			else
			{
				var perc = Math.round(100 * toTop / eleHeight);
				var a_value = parseFloat(perc) / 100;
				a_value = 0.5 - (a_value / 2);
				aboutOverlay.style.display = 'block';
				aboutOverlay.style.backgroundColor = "rgba(0,0,0," + a_value + ")";
				about.className = "content_fixed";
				if(getWindowWidth() <= 1300)
				{
					$('.menu_line').css('background', "#ffffff");
				}
				else
				{
					$('.menu_line').css('background', "#000000");
				}
				$('#arrow_top').css('visibility', "hidden");
				$('#arrow_top').css('opacity', "0");

				initHeight();
				hamburger.removeClass('menu_container_fixed');
				logoContainer.removeClass('logo_fixed');
				logo.removeClass('logo_black');
				logo.addClass('logo_white');
				addActive($('#menu_home'));
			}

			if(toTop > $('#skills_block').position().top - 1)
			{
				addActive($('#menu_skills'));
			}
			if(toTop > $('#services_block').position().top - 1)
			{
				addActive($('#menu_services'));
			}
			if(toTop > $('#projects_block').position().top - 1)
			{
				addActive($('#menu_projects'));
			}
			if(toTop > $('#team_block').position().top - 1)
			{
				addActive($('#menu_team'));
			}
			if(toTop > $('#testimonials_block').position().top - 1)
			{
				addActive($('#menu_testimonies'));
			}

			if(toTop > skillsPos)
			{
				logo.removeClass('logo_black');
				logo.addClass('logo_white');

			}
			if(toTop > skillsHeight)
			{
				logo.removeClass('logo_white');
				logo.addClass('logo_black');
			}

			if(toTop > servicesPos)
			{
				logo.removeClass('logo_black');
				logo.addClass('logo_white');
			}
			if(toTop > servicesHeight)
			{
				logo.removeClass('logo_white');
				logo.addClass('logo_black');
			}

			if(toTop > projectsPos)
			{
				logo.removeClass('logo_black');
				logo.addClass('logo_white');
			}
			if(toTop > projectsHeight)
			{
				logo.removeClass('logo_white');
				logo.addClass('logo_black');
			}

			if(toTop > clientsPos)
			{
				logo.removeClass('logo_black');
				logo.addClass('logo_white');
			}
			if(toTop > clientsHeight)
			{
				logo.removeClass('logo_white');
				logo.addClass('logo_black');
			}

			if(toTop > teamPos)
			{
				logo.removeClass('logo_black');
				logo.addClass('logo_white');
			}
			if(toTop > teamHeight)
			{
				logo.removeClass('logo_white');
				logo.addClass('logo_black');
			}
		}
	}

	function addActive(ele)
	{
		//code to change color of the navigation link when you scroll to the apropriate section
		$('.menu_item').each(function()
		{
			$(this).removeClass('main_menu_active');
		});
		ele.addClass('main_menu_active');
	}
	
	/* --- 4. Letter --- */

	function initLetter()
	{
		// This function resizes the large letter N on top of the slider background image
		var heroBlock = document.getElementById('hero_block');
		var letter = document.getElementById('hero_block_letter');
		var heroBlockHeight = heroBlock.clientHeight;
		var heroBlockWidth = heroBlock.clientWidth;
		if(heroBlockWidth < 680)
		{
			letter.style.fontSize = (heroBlockHeight * 0.60) + "px";
			letter.style.lineHeight = ((heroBlockHeight * 0.50) / 1.25) + "px";
			letter.style.paddingTop = ((heroBlockHeight * 0.50) / 0.31) + "px";
		}
		else if(heroBlockWidth < 1100)
		{
			letter.style.fontSize = (heroBlockHeight * 0.75) + "px";
			letter.style.lineHeight = ((heroBlockHeight * 0.75) / 1.25) + "px";
			letter.style.paddingTop = ((heroBlockHeight * 0.75) / 0.53) + "px";
		}
		
		else
		{
			letter.style.fontSize = (heroBlockHeight + 100) + "px";
			letter.style.lineHeight = (heroBlockHeight / 1.25) + "px";
			letter.style.paddingTop = (heroBlockHeight / 0.83) + "px";
		}
	}
	
	/* --- 5. Main Menu --- */

	function initMainMenu()
	{
		//menu with navigation and social links behind the hamburger icon
		var line_1 = document.getElementById('menu_line_1');
		var line_2 = document.getElementById('menu_line_2');
		var line_3 = document.getElementById('menu_line_3');
		var mainMenuContainer = $('.main_menu_container');
		var rect = $('.rect');
		var menuItem = $('.main_menu_item');
		var hamburger_menu = $('.menu_container');
		var exitMenu = $('.menu_exit_container');
		var exit_1 = $('.exit_line_1');
		var exit_2 = $('.exit_line_2');
		var menuClose = $('.menu_exit');
		var menuSocial = $('.main_menu_social');
		
		hamburger_menu.on('click', function()
		{
			line_1.style.width = "100%";
			line_2.style.width = "100%";
			line_3.style.width = "100%";

			if(getWindowWidth() <= 680)
			{
				menuSocial.css('left', "50%");
			}
			else
			{
				
				menuSocial.css('left', "50px");
			}
			
			TweenMax.to(mainMenuContainer, 0, {right:0});
			TweenMax.staggerTo(rect, 0.7, 
			{
				ease:Power2.easeInOut,
				right:0,
				opacity:1
			}, 0.08);
			TweenMax.staggerFromTo(menuItem, 0.5,
			{
				ease:Power2.easeInOut,
				opacity:0, 
				y:20,
				delay:0.9
			},
			{
				ease:Power2.easeInOut,
				opacity:1, 
				y:0,
				delay:0.9
			}, 0.05);
			TweenMax.to(exitMenu, 0.3, {y:-10,opacity:1,delay:1.4});
			TweenMax.to(exit_1, 0.1, {rotation: 45, delay:1.4});
			TweenMax.to(exit_2, 0.1, {rotation: -45, delay:1.4});
			TweenMax.to(menuSocial, 0.3, {opacity:1,delay:1.4});
		});

		menuClose.on('click', function()
		{
			line_1.style.width = "80%";
			line_2.style.width = "40%";
			line_3.style.width = "61%";

			var rightPosition = mainMenuContainer.width();

			TweenMax.to(exitMenu, 0.3, {y:10,opacity:0});

			TweenMax.staggerTo(menuItem, 0.3,
			{
				ease:Power2.easeInOut,
				opacity:0, 
				y:20
			}, 0.05);
			TweenMax.staggerTo(rect, 0.3, 
			{
				ease:Power2.easeInOut,
				right:(-1 * rightPosition),
				opacity:0,
				delay: 0.5
			}, 0.05);
			TweenMax.to(menuSocial, 0.3, {opacity:0, delay:0.6});
			TweenMax.to(exit_1, 0.1, {rotation: 0});
			TweenMax.to(exit_2, 0.1, {rotation: 0});
			TweenMax.to(mainMenuContainer, 0, {right:(-1 * rightPosition), delay:1.2});
		});

		$('.menu_item').on('click', function(e)
		{
			e.preventDefault();
			var vpHeight = $(window).height();
			var href = $(this).attr('href');
			var container = $('.container');
			
			if(href === "#about_block_container")
			{
				container.mCustomScrollbar("scrollTo", vpHeight, {scrollInertia:1500});
			}
			else if(href === "top")
			{
				container.mCustomScrollbar("scrollTo", '0', {scrollInertia:1500});
			}
			else
			{
				container.mCustomScrollbar("scrollTo", href, {scrollInertia:1500});
			}
		});
	}

	function reMainMenu()
	{
		var ele = $('.main_menu_container');
		var pos = ele.css('right');
		if(pos !== "0px")
		{
			if(getWindowWidth() <= 680)
			{
				$('.main_menu_container').css('right', "-100%");
			}
			else
			{
				$('.main_menu_container').css('right', "-450px");
			}
		}
		
	}

	function reSocial()
	{
		$('.main_menu_social').css('transform', 'none');
		if(getWindowWidth() <= 680)
		{
			$('.main_menu_social').css('left', '50%');
		}
		else
		{
			$('.main_menu_social').css('left', '50px');
		}
	}

	/* --- 6. Slider --- */

	function initSlider()
	{
		$(".owl-carousel").owlCarousel(
		{
			items:1,
			loop:true,
			dots:true,
			autoplayHoverPause:false,
			dotsContainer: '#customDots',
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			autoplay:true,
			autoplayTimeout:8000,
			smartSpeed: 500,
			nav:true,
			navText:["<i class='fa fa-chevron-up'></i>","<i class='fa fa-chevron-down'></i>"]
		});
		var owl = $('.owl-carousel');
		//Handler for custom slider dots
		$('.owl-dot').on('click', function ()
		{
			owl.trigger('to.owl.carousel', [$(this).index(), 500]);
			caroImgChange($(this).index() + 1);
		});
		//code to change slider background image
		owl.on('changed.owl.carousel', function(event)
		{
			if(event.item.index < 3)
			{
				caroImgChange(5);
			}
			else
			{
				caroImgChange(event.item.index - 2);
			}
		});

		function caroImgChange(i)
		{
			if(i > 0)
			{
				$('.carousel_img').each(function()
				{
					$(this).removeClass('carousel_img_active');
				});
				$('.carousel_img_' + i).addClass('carousel_img_active');
			}
		}
		
		$(".owl-carousel-2").owlCarousel(
		{
			items:6,
			loop:true,
			dots:false,
			autoplayHoverPause:true,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			autoplay:true,
			autoplayTimeout:5000,
			smartSpeed: 500,
			responsive:
			{
				0:
				{
					items:1
				},
				480:
				{
					items:1
				},
				540:
				{
					items:1
				},
				680:
				{
					items:3
				},
				900:
				{
					items:3
				},
				1100:
				{
					items:5
				},
				1280:
				{
					items:6
				}
			}
		});
	}

	/* --- 7. SvgOne --- */

	function initSvgOne()
	{
		var svg = document.getElementById('svg_1'),
			svgRect = document.getElementById("svg_1_rect"),
			windowWidth = getWindowWidth(),
			col = Math.round(windowWidth / 12);
		
		if(windowWidth <= 480)
		{
			svg.setAttribute("width", Math.round(windowWidth - 40));
			svg.setAttribute("height", Math.round((windowWidth - 40) / 1.875));
			svgRect.setAttribute("x", 0);
			svgRect.setAttribute("y", 0);
			svgRect.setAttribute("width", Math.round(windowWidth - 40));
			svgRect.setAttribute("height", Math.round((windowWidth - 40) / 1.875));
		}
		else if(windowWidth <= 1170)
		{
			svg.setAttribute("width", Math.round(windowWidth - 50));
			svg.setAttribute("height", Math.round((windowWidth - 50) / 1.875));
			svgRect.setAttribute("x", 0);
			svgRect.setAttribute("y", 0);
			svgRect.setAttribute("width", Math.round(windowWidth - 50));
			svgRect.setAttribute("height", Math.round((windowWidth - 50) / 1.875));
		}
		else
		{
			col = 97.5;
			svg.setAttribute("width", Math.round((col * 14) - 50));
			svg.setAttribute("height", Math.round(((col * 14) - 50) / 1.875));
			svgRect.setAttribute("x", col);
			svgRect.setAttribute("y", col);
			svgRect.setAttribute("width", Math.round(col * 12) - 50);
			svgRect.setAttribute("height", Math.round((((col * 14) - 50) / 1.875) - col * 2));
		}
		
		svg.addEventListener('mouseover', function()
		{
			if(windowWidth <= 480)
			{
				tweenIt(0, 0, windowWidth - 40, ((windowWidth - 40) / 1.875));
			}
			else if(windowWidth <= 1170)
			{
				tweenIt(0, 0, windowWidth - 50, ((windowWidth - 50) / 1.875));
			}
			else
			{
				col = 97.5;
				tweenIt(0, 0, col * 14 - 50, (col * 14 - 50) / 1.875);
			}
		});
		
		svg.addEventListener('mouseout', function()
		{
			if(windowWidth <= 480)
			{
				tweenIt(0, 0, windowWidth - 40, (windowWidth - 40) / 1.875);
			}
			else if(windowWidth <= 1170)
			{
				tweenIt(0, 0, windowWidth - 50, (windowWidth - 50) / 1.875);
			}
			else
			{
				col = 97.5;
				tweenIt(col, col, ((col * 14) - 50) - col * 2, (((col * 14) - 50) / 1.875) - col * 2);
			}
		});
		
		function tweenIt(x, y, w, h)
		{
			TweenMax.to(svgRect, 0.3, 
			{
				ease:Power4.easeInOut,
				attr:
				{
					x:x,
					y:y,
					width:w,
					height:h
				}
			});
		}

		initHeight();
	}

	/* --- 8. ProgressBar --- */

	function initProgressBars()
	{
		//Activates progress bars when scrolled to the element
		var pBarClasses = [document.getElementById('skill_1_pbar'), document.getElementById('skill_2_pbar'), document.getElementById('skill_3_pbar'), document.getElementById('skill_4_pbar'), document.getElementById('skill_5_pbar'), document.getElementById('skill_6_pbar')];
	
		for(var i = 0; i < pBarClasses.length; i+=1)
		{
			pBarInfo[i] = {pbClass : pBarClasses[i], pbPerc : pBarClasses[i].getAttribute('data-perc'), pbPos : pBarClasses[i].getAttribute('data-pos')};
		}

		for(var p = 0; p < pBarInfo.length; p+=1)
		{
			var skillBar = new ProgressBar.Line(pBarInfo[p].pbClass,
			{
				duration: 1400,
				color: '#FFCC5F',
				easing: 'easeInOut',
				svgStyle: {width: '100%', height: '100%'},
				text:
				{
					style:
					{
						color: '#999',
						position: 'absolute',
						right: pBarInfo[p].pbPos + '%',
						top: '-20px',
						padding: 0,
						margin: 0,
						transform: null
					},
					autoStyleContainer: false
				},
				step: function(state, bar)
				{
					bar.setText(Math.round(bar.value() * 100) + ' %');
				}
			});
			skillBars[p] = skillBar;
		}
	}

	function getWindowWidth()
	{
		return window.innerWidth;
	}
	
	/* --- 9. Footer  --- */

	function initFooter()
	{
		$('.footer_overlay').css('height', $('#footer').height());
		var vpHeight = $(window).height();

		$('.footer_nav_items').on('click', function(e)
		{
			e.preventDefault();
			var href = $(this).attr('href');
			var container = $('.container');

			if(href === "#about_block_container")
			{
				container.mCustomScrollbar("scrollTo", vpHeight, {scrollInertia:1500});
			}
			else if(href === "top")
			{
				container.mCustomScrollbar("scrollTo", "top", {scrollInertia:1500});
			}
			else
			{
				container.mCustomScrollbar("scrollTo", href, {scrollInertia:1500});
			}
		});
	}

	/* --- 10. Top Arrow  --- */

	function initTopArrow()
	{
		$('#arrow_top').on('click', function()
		{
			$('.container').mCustomScrollbar('scrollTo', "top", {scrollInertia: 1500});
		});
	}

	/* --- 11. Services Browse Button ---*/

	function initBrowseButton()
	{
		$('.browse_services_btn').on('click', function()
		{
			$('.container').mCustomScrollbar('scrollTo', $('#services_block'), {scrollInertia: 1500});
		});
	}
});

/* --- 12. YouTube Video Background  --- */

$( window ).on("load", function()
{
	"use strict";
	
	initYTPlayer();

	/* --- 10. YTPlayer --- */

	function initYTPlayer()
	{
		window.focus();
		jQuery("#background_video").YTPlayer();
	}
});