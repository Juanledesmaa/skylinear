/**
 * @file  Base JavaScript needed independent of the project
 */

/**
 * Fix viewport issues with IE 10.
 * @see {@link http://getbootstrap.com/getting-started/#support-ie10-width}
 */
export function ieViewportFix() {
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    const msViewportStyle = document.createElement('style');
    msViewportStyle.append(
      document.createTextNode('@-ms-viewport{width:auto!important}')
    );
    document.querySelector('head').append(msViewportStyle);
  }
}

/**
 * Avoid `console` errors in browsers that lack a console.
 * @see {@link https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js}
 */
export function consoleErrorFix() {
  let method;
  const noOp = function() {};

  const methods = [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn'
  ];
  let length = methods.length;
  const console = window.console || {};

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noOp;
    }
  }
}

export function setupCarousel() {
  $('.primary-banner #carousel-example').on('slide.bs.carousel', function (e) {
    const $e = $(e.relatedTarget);
    const idx = $e.index();
    const itemsPerSlide = 5;
    const totalItems = $('.primary-banner .carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        const it = itemsPerSlide - (totalItems - idx);
        for (let i = 0; i < it; i++) {
            if (e.direction === "left") {
                $('.primary-banner .carousel-item').eq(i).appendTo('.carousel-inner');
            } else {
                $('.primary-banner .carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
  });
}

export function setupNavbar() {
  $(".sidebarNavigation .navbar-collapse").hide().clone().appendTo("body").removeAttr("class").addClass("sideMenu").show();
  $("body").append("<div class='overlay'></div>");
  $(".navbar-toggle, .navbar-toggler").on("click", function() {
    $(".sideMenu").addClass($(".sidebarNavigation").attr("data-sidebarClass"));
    $(".sideMenu, .overlay").toggleClass("open");
    $(".overlay").on("click", function() {
      $(this).removeClass("open");
      $(".sideMenu").removeClass("open")
    })
  });
  $("body").on("click", ".sideMenu.open .nav-item", function() {
    if (!$(this).hasClass("dropdown")) {
      $(".sideMenu, .overlay").toggleClass("open")
    }
  });
  $(window).resize(function() {
    if ($(".navbar-toggler").is(":hidden")) {
      $(".sideMenu, .overlay").hide();
    } else {
      $(".sideMenu, .overlay").show();
    }
  })
}

export function setupMainBannerCarousel() {
//   $('#myCarousel').carousel({
//     interval: 30000000
//  });

//  $('#carousel-section #carousel-example').carousel({
//     interval: 5000,
//     pause: "hover",
//     wrap: true
//   });

  $('#carousel-section #carousel-example').on('slide.bs.carousel', function (e) {
    const $e = $(e.relatedTarget);
    const idx = $e.index();
    const itemsPerSlide = 5;
    const totalItems = $('#carousel-section #carousel-example .carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        const it = itemsPerSlide - (totalItems - idx);
        for (let i = 0; i < it; i++) {
            if (e.direction === "left") {
                $('#carousel-section #carousel-example .carousel-item').eq(i).appendTo('#carousel-section #carousel-example .carousel-inner');
            }
            else {
                $('#carousel-section #carousel-example .carousel-item').eq(0).appendTo('#carousel-section #carousel-example .carousel-inner');
            }
        }
    }
  });


}

export function setupFilterImageGallery() {
	$(".filter-button").click(function() {
    const value = $(this).attr('data-filter');

		if (value === "all") {
			$('.filter').show('1000');
		} else {
			$(".filter").not('.' + value).hide('3000');
			$('.filter').filter('.' + value).show('3000');
		}
  });

	if ($(".filter-button").removeClass("active")) {
		$(this).removeClass("active");
  }

  $(this).addClass("active");
}

export function cyclePrintBanner() {
  const images = [
    "/assets/img/banner_impresiones_plotter.jpg",
    "/assets/img/banner_impresiones_cama_plana.jpg"
  ]

  let i = 0;

  $(function() {
    setInterval(function() {
      $('.printing .banner-content-img').css('background-image', 'url(' + images[i] + ')');
      i = i + 1;
      if (i === images.length) {
      i =  0;
      }
    }, 7000);
  });
}

export function openModalGallery() {
  $(".gallery img").on("click", function() {
    const imageName = $(this).attr('src');

    $('.gallery .mySlides img').attr("src", imageName);
    
    $('.gallery #myModal').show();

  });
}

export function closeModalGallery() {
  $(".gallery #myModal .close.cursor").on("click", function() {
    $('.gallery #myModal').hide();
  });

  $(document).on('keydown', function(event) {

    if (event.key === "Escape") {
      console.log("Se presiono escape");
      if ($('.gallery #myModal').length) {
        $('.gallery #myModal').hide();
      }
    }
  });
}

export function plusSlidesGallery() {
  $(".gallery #myModal .next").on("click", function() {
    const actualImage = $(this).siblings(".mySlides").find('img').attr("src");
    const imageToFind = $('.gallery').find(`img[src$='${actualImage}']`).parent('.gallery_product').next('.gallery_product').find('img').attr('src');
    const firstImage = $('.gallery').find('.gallery_product:first-child img').attr("src");
    if (imageToFind) {
      $('.gallery #myModal img').hide();
      $('.gallery .mySlides img').attr("src", imageToFind);
      $('.gallery #myModal img').show();
    } else {
      $('.gallery #myModal img').hide();
      $('.gallery .mySlides img').attr("src", firstImage);
      $('.gallery #myModal img').show();
    }
  });
}

export function currentSlideGallery() {
  $(".gallery #myModal .prev").on("click", function() {
    const actualImage = $(this).siblings(".mySlides").find('img').attr("src");
    const imageToFind = $('.gallery').find(`img[src$='${actualImage}']`).parent('.gallery_product').prev('.gallery_product').find('img').attr('src');
    const lastImage = $('.gallery').find('.gallery_product:last-child img').attr("src");
    if (imageToFind) {
      $('.gallery #myModal img').hide();
      $('.gallery .mySlides img').attr("src", imageToFind);
      $('.gallery #myModal img').show();
    } else {
      $('.gallery #myModal img').hide();
      $('.gallery .mySlides img').attr("src", lastImage);
      $('.gallery #myModal img').show();
    }
  });
}

export function addProductCotizacion() {
  $(".product-detail .qty-change.plus").on("click", function() {
    let number = Number($(".product-detail .qty-input").val());
    number++;
    $(".product-detail .qty-input").val(number);
  });
}

export function removeProductCotizacion() {
  $(".product-detail .qty-change.minus").on("click", function() {
    let number = Number($(".product-detail .qty-input").val());
    if (number > 1) {
      number--;
      $(".product-detail .qty-input").val(number);
    }
  });
}

export function buttonNavbarResponsive() {
  $(document).ready(function () {
    $(document).on('click', '.cta', function () {
      $(this).toggleClass('active')
    })
  });
}