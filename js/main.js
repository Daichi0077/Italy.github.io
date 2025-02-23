



function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}







var $menubar = $('#menubar');
var $menubarHdr = $('#menubar_hdr');
var $headerNav = $('header nav');


$(window).on("load resize", debounce(function() {
    if(window.innerWidth < 9999) {	
        
        $('body').addClass('small-screen').removeClass('large-screen');
        $menubar.addClass('display-none').removeClass('display-block');
        $menubarHdr.removeClass('display-none ham').addClass('display-block');
    } else {
        
        $('body').addClass('large-screen').removeClass('small-screen');
        $menubar.addClass('display-block').removeClass('display-none');
        $menubarHdr.removeClass('display-block').addClass('display-none');

        
        $('.ddmenu_parent > ul').hide();
    }
}, 10));

$(function() {

    
    $menubarHdr.click(function() {
        $(this).toggleClass('ham');
        if ($(this).hasClass('ham')) {
            $menubar.addClass('display-block');
        } else {
            $menubar.removeClass('display-block');
        }
    });

    
    $menubar.find('a[href*="#"]').click(function() {
        $menubar.removeClass('display-block');
        $menubarHdr.removeClass('ham');
    });

    
	$menubar.find('a[href=""]').click(function() {
		return false;
	});
	$headerNav.find('a[href=""]').click(function() {
		return false;
	});

	
    $menubar.find('li:has(ul)').addClass('ddmenu_parent');
    $('.ddmenu_parent > a').addClass('ddmenu');
    $headerNav.find('li:has(ul)').addClass('ddmenu_parent');
    $('.ddmenu_parent > a').addClass('ddmenu');


var touchStartY = 0;


$('.ddmenu').on('touchstart', function(e) {
    
    touchStartY = e.originalEvent.touches[0].clientY;
}).on('touchend', function(e) {
    
    var touchEndY = e.originalEvent.changedTouches[0].clientY;
    
    
    var touchDifference = touchStartY - touchEndY;
    
    
    if (Math.abs(touchDifference) < 10) { 
        var $nextUl = $(this).next('ul');
        if ($nextUl.is(':visible')) {
            $nextUl.stop().hide();
        } else {
            $nextUl.stop().show();
        }
        $('.ddmenu').not(this).next('ul').hide();
        return false; 
    }
});

    
    $('.ddmenu_parent').hover(function() {
        $(this).children('ul').stop().show();
    }, function() {
        $(this).children('ul').stop().hide();
    });

    
    $('.ddmenu_parent ul a').click(function() {
        $('.ddmenu_parent > ul').hide();
    });

});





$(function() {
  function toggleBodyScroll() {
    
    if ($('#menubar_hdr').hasClass('ham') && !$('#menubar_hdr').hasClass('display-none')) {
      
      $('body').css({
        overflow: 'hidden',
        height: '100%'
      });
    } else {
      
      $('body').css({
        overflow: '',
        height: ''
      });
    }
  }

  
  toggleBodyScroll();

  
  const observer = new MutationObserver(toggleBodyScroll);
  observer.observe(document.getElementById('menubar_hdr'), { attributes: true, attributeFilter: ['class'] });
});





$(function() {
    
    var topButton = $('.pagetop');
    
    var scrollShow = 'pagetop-show';

    
    
    function smoothScroll(target) {
        
        var scrollTo = target === '#' ? 0 : $(target).offset().top;
        
        $('html, body').animate({scrollTop: scrollTo}, 500);
    }

    
    $('a[href^="#"], .pagetop').click(function(e) {
        e.preventDefault(); 
        var id = $(this).attr('href') || '#'; 
        smoothScroll(id); 
    });

    
    $(topButton).hide(); 
    $(window).scroll(function() {
        if($(this).scrollTop() >= 300) { 
            $(topButton).fadeIn().addClass(scrollShow); 
        } else {
            $(topButton).fadeOut().removeClass(scrollShow); 
        }
    });

    
    if(window.location.hash) {
        
        $('html, body').scrollTop(0);
        
        setTimeout(function() {
            smoothScroll(window.location.hash);
        }, 10);
    }
});

