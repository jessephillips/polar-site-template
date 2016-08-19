(function ($) {

  let didScroll = false;
  let lastScrollTop;
  let st = $(window).scrollTop();
  let windowHeight = $(window).innerHeight();
  let bottomedOut = false;
  let chameleonDivs = [];
  let originalBackground = $('body').css('background');
  let $body = $(document.body);
  let bodyHeight = $body.height();
  let $navbar = $('.navbar-default');
  let $navbarLight = $('.navbar-light');
  let $lights = $('.spinning-light');

  let setHeights = function () {
    windowHeight = $(window).innerHeight();
  };

  // // setup the spinning lights
  // $(window).on('scroll', function () {
  //   console.log('scroll', st / bodyHeight * 1080);
  //   $lights.css({
  //     transform: `rotate(${Math.round($body.scrollTop())}deg)`,
  //   });
  // });

  /*
  *  Scroll Functions
  */
  let changeBackground = function (st) {
    if (chameleonDivs.length === 0) {
      return;
    } else {
      var isChameleonDiv = false;

      $.each(chameleonDivs, function () {
        if (st >= this.start && st <= this.end) {
          $('body').css({
            'background-image': this.backgroundImage,
            'background-color': this.backgroundColor,
          });
          isChameleonDiv = true;
        }
      });

      if (isChameleonDiv === false) {
        $('body').css('background-color', '#fff');
      }
    }
  };

  function hasScrolled() {

    //initialize scroll position and find location

    var st;
    st = $(window).scrollTop();

    changeBackground(st);

    if (Math.abs(lastScrollTop - st) <= 10) {

      // didn't scroll far enough, stop function
      // $lights.removeClass('animated');
      return;
    }

    if (st > lastScrollTop && st > 70) {

      // scrolling down

      // $lights.addClass('animated');
      $('.navbar-fixed-top').css('top', '-70px');
      $('.left-vertical-link').css('left', '-30px');
      $('.right-vertical-link').css('right', '-30px');
    } else if (st + $(window).height() < $(document).height()) {

      // scrolling up

      // $lights.addClass('animated');
      $('.navbar-fixed-top').css('top', 0);
      $('.left-vertical-link').css('left', '30px');
      $('.right-vertical-link').css('right', '30px');
    }

    if (st >= $(document).height() - $(window).innerHeight()) {

      setTimeout(function () {
        if (st >= $(document).height() - $(window).innerHeight()) {
          $('#jediDiv').slideDown();
        }
      }, 500);
    }

    if ($navbarLight.length > 0) {
      if (st >= windowHeight) {
        $('.navbar-default').removeClass('navbar-light');
      } else {
        $('.navbar-default').addClass('navbar-light');
      }
    }

    //reset scroll position

    lastScrollTop = st;
  }

  //throttled scroll check
  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 100);

  $(window).scroll(function () {
    didScroll = true;
  });

  // constructs new chameleon objects

  let ChameleonObject = function (scopedThis) {
    var chameleonSection = {
      start: $(scopedThis).offset().top - (windowHeight / 1.5),
      end: ($(scopedThis).offset().top - (windowHeight / 1.5)) + $(scopedThis).outerHeight(),
      backgroundColor: $(scopedThis).data('background') || '#e6e6e6',
      type: $(scopedThis).data('type') || undefined,
    };

    if (chameleonSection.type === 'color') {
      chameleonSection.backgroundImage = 'none';
    }

    if (chameleonSection.type === 'image') {
      chameleonSection.backgroundColor = '#666';
      chameleonSection.backgroundImage = $(scopedThis).data('background');
    }

    return chameleonSection;
  };

  $(document).ready(function () {
    $('.chameleon').each(function (index, element) {

      //get top of div + background from data attributes

      chameleonDivs.push(new ChameleonObject(this));
    });
  });

  // Sidekick Text Function

  $('.cursor-sidekick').each(function (index, element) {
    var sidekick = `
      <span class="sidekick-text"
        id="sidekick${index}"
        style="color: ${element.getAttribute('data-color')}; display: none;">
        ${element.getAttribute('data-text')}
      </span>`;

    $(this)
      .append(sidekick)
      .mouseenter(() => {
        $('#sidekick' + index).css('display', 'block');
      })
      .mouseleave(() => {
        $('#sidekick' + index).css('display', 'none');
      })
      .mousemove((e) => {
        $('#sidekick' + index).css({ top: e.pageY - $(this).offset().top, left: e.pageX + 20 });
      })
      .click((e) => {
        if (e.target.tagName.toLowerCase() !== 'a') {
          window.location.href = $(this).data('href');
        }
      });
  });

  $('.image-sources > li').each(function () {
    var originalSrc = $('#image-target').attr('src');
    $(this).data('originalSrc', originalSrc);
    $(this).children('a')
    .mouseover(() => {
      $('#image-target').attr({
        src: $(this).data('img-src'),
      });
    })
    .mouseleave(() => {
      $('#image-target').attr({
        src: $(this).data('originalSrc'),
      });
    });
  });

  // searchbar function

  $('#searchbar').click((event) => {
    $('.search-field').removeClass('hidden');
    $('.search-field__input').focus();
  });

  $('.search-field')
    .submit((e) => {
      e.preventDefault();
      let search = $('.search-field__input').val();
      window.location.assign(
        window.location.origin + '/?s=' + search
      );
      $('.search-field__input').val('').blur();
    });

  $('.search-field__input')
    .blur(() => $('.search-field').addClass('hidden'));

  $('.close-searchbar').click(function () {
    $('.search-field').addClass('hidden');
    $('.search-field__input').focus();
  });

  $('#sel1').click(function (e) {
    $(this).removeClass('form-transparent');
    $('.hidden-form').slideDown();
  });

  $.preloadImages = function () {
    for (var i = 0; i < arguments.length; i++) {
      $('<img />').attr('src', 'images/services/services-' + arguments[i] + '.png');
    }
  };

  $.preloadImages(
    'a-b-testing',
    'app-design',
    'app-development',
    'art-direction',
    'graphic-design',
    'illustration',
    'information-architecture',
    'logo-design',
    'user-experience',
    'web-design',
    'web-development',
    'website-optimization',
    'wireframing');

})(jQuery);
