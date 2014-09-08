$(document).ready(function(){


 // Animating the word cloud -------------------------

function colorIn(n){
	var fore = $('.cloud_f')[n];
    $('#cloud_bkg').stop().animate({opacity: 0.2},{queue:false, duration:2000, easing: 'easeOutExpo'});
	$(fore).stop().fadeIn('2000')
};

 function colorOut(){
    $('#cloud_bkg').stop().animate({opacity: 1},{queue:false, duration:2000, easing: 'easeOutExpo'});
	$('.cloud_f').stop().fadeOut('2000')
};
 
   //When mouse rolls over
   $('#area_projet').mouseover(
		function(){colorIn(0);}
	); 
	$('#area_reseau').mouseover(
		function(){colorIn(2);}
	); 
	$('#area_eclore').mouseover(
		function(){colorIn(1);}
	); 
    //When mouse is removed
   $('#navarea a').mouseout(function(){
	colorOut() ;
    });
 

 //--------------------------------------------------------
 
 
 

//  Scrolling down when clicking on the word ---------------------------------------

$('a[href*=#]').each(function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
	&& location.hostname == this.hostname
	&& this.hash.replace(/#/,'') ) { // remove the hash in front of the anchor part of the url, basically making sure that we are at an anchor
		var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
		var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
		if ($target) {
			var targetOffset = $target.offset().top;
			$(this).click(function() {
					$("#nav li a").removeClass("active");
					$(this).addClass('active');
			$('html, body').animate({scrollTop: targetOffset}, 2000);
			return false;
			});
		}
	}
});


//  Animation for the parallax (scrolling effect) part of the site ---------------------------------------


var $window = $(window);
var $proj = $('#projet');
var $banproj = $('#banner_projet');
var $wordproj = $('#word_projet');
var $reseau = $('#reseau');
var $banreseau = $('#banner_reseau');
var $wordreseau = $('#word_reseau');
var $eclore = $('#eclore');
var $baneclore = $('#banner_eclore');
var $wordeclore = $('#word_eclore');
var windowHeight = $window.height();
	

	
function newPos($el, windowHeight, scrollpos, vel, vf){
	var x = $el.css('backgroundPosition').slice(0,$el.css('backgroundPosition').indexOf(' ')).trim();
	var baseunit = windowHeight;
//	alert(baseunit);
	return x  + ' ' + (  vf + (scrollpos - baseunit) * vel * 100 /baseunit )  + "%"; // adjuster start
}
	
	
function Move(){
    var pos = $window.scrollTop();
//	alert(newPos($banproj, windowHeight, pos, 300, 200));
//   $banproj.css('backgroundPosition', '' + newPos($banproj, windowHeight, pos, -0.95, 58.8 ));
   $wordproj.css('backgroundPosition', '' + newPos($wordproj, windowHeight, pos, -1.35 , 105));
//   $banreseau.css('backgroundPosition', '' + newPos($banreseau, windowHeight, pos, -0.95, 140+58.8  ));
   $wordreseau.css('backgroundPosition', '' + newPos($wordreseau, windowHeight, pos, -1.35 , 195+105 ));
//   $baneclore.css('backgroundPosition', '' + newPos($baneclore, windowHeight, pos, -0.95, 280+58.8  ));
   $wordeclore.css('backgroundPosition', '' + newPos($wordeclore, windowHeight, pos, -1.35 , 367+130 ));
}

$window.resize(function(){
   Move();
});

$window.bind('scroll', function(){
	Move();
});

$(function() {
    Move();
});













    // Using custom configuration
$('#projcarousel').carouFredSel({

		auto    : {
	        items           : 3,
	        duration        : 1000,
	        easing          : "easeInOutCubic",
		},


        items  : 3,
		responsive  : true,
		
		prev : {
	        button      : "#carousel_prev",
	        key         : "left",
	        items       : 1,
	        easing      : "easeInOutCubic",
	        duration    : 750
	    },
	    next : {
	        button      : "#carousel_next",
	        key         : "right",
	        items       : 1,
	        easing      : "easeInOutCubic",
	        duration    : 1250
		}	
		
});
	

$("#foccarousel").carouFredSel({
	responsive	: true,
	scroll		: {
		fx			: "crossfade" ,
		duration : 1500,
	},
	items		: {
		visible		: 1,
		height		: 280,
	}
});



$('#tweet').tweecool({
        //settings
         username : 'ResEclore', 
         limit : 4  
      });
		



});