import _ from 'underscore';
import moment from 'moment';
import 'bootstrap-sass';

console.log('Hello, World');

let didScroll = false;
let lastScrollTop;
let st = $(window).scrollTop();
let windowHeight = $(window).innerHeight();
let $yellow = $('#yellow').offset().top - windowHeight;
let $orange = $('#orange').offset().top - windowHeight;
let $red    = $('#red').offset().top - windowHeight;
let $purple = $('#purple').offset().top - windowHeight;
let $blue   = $('#blue').offset().top - windowHeight;
let $body   = $('body');

/*
*  Scroll Functions
*/

function hasScrolled() {

  //initialize scroll position and find location

  var st;
  st = $(window).scrollTop();

  if (st < $yellow) {
    $body.css('background-color', '#e6e6e6');
  }

  if (st > $yellow && st < $orange) {
    $body.css('background-color', '#F8F800');
  }

  if (st > $orange && st < $red) {
    $body.css('background-color', '#FF9900');
  }

  if (st > $red && st < $purple) {
    $body.css('background-color', '#FD3A3C');
  }

  if (st > $purple && st < $blue) {
    $body.css('background-color', '#DCC3E0');
  }

  if (st > $blue) {
    $body.css('background-color', '#4E99FF');
  }

  if (Math.abs(lastScrollTop - st) <= 10) {

    //didnt scroll enough, do nothing and break function

    return;
  }

  if (st > lastScrollTop && st > 15) {

    // scrolling down

    $('.navbar-fixed-top').css('top', '-70px');
  } else if (st + $(window).height() < $(document).height()) {

    // scrolling up

    $('.navbar-fixed-top').css('top', 0);
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

/*
* Helper Text Function
*/

$('.helper-text').each(function () {
  console.log(this);
  $(this)
    .closest('.helper-text-box')
    .mouseenter(() => {
      $(this).removeClass('hidden');
    })
    .mouseleave(() => {
      $(this).addClass('hidden');
    })
    .mousemove((e) => {
      $(this).css({ top: e.pageY + 10, left: e.pageX + 20 });
    });
});
