import _ from 'underscore';
import moment from 'moment';
import 'bootstrap-sass';

let didScroll = false;
let lastScrollTop;
let st = $(window).scrollTop();
let windowHeight = $(window).innerHeight();
let bottomedOut = false;
let chameleonDivs = [];
let originalBackground = $('body').css('background');

/*
*  Scroll Functions
*/
let changeBackground = function (st) {

  var foo = false;

  $.each(chameleonDivs, function () {
    if (st >= this.start && st <= this.end) {
      $('body').css({
        'background-image': this.backgroundImage,
        'background-color': this.backgroundColor,
      });
      foo = true;
    }
  });

  if (foo === false) {
    $('body').css('background', originalBackground);
  }

};

function hasScrolled() {

  //initialize scroll position and find location

  var st;
  st = $(window).scrollTop();

  changeBackground(st);

  if (Math.abs(lastScrollTop - st) <= 10) {

    // didn't scroll far enough, stop function

    return;
  }

  if (st > lastScrollTop && st > 70) {

    // scrolling down

    $('.navbar-fixed-top').css('top', '-70px');
  } else if (st + $(window).height() < $(document).height()) {

    // scrolling up

    $('.navbar-fixed-top').css('top', 0);
  }

  if (st >= $(document).height() - $(window).innerHeight() && $('#foo').length === 0) {

    //not working

    if (bottomedOut === false) {
      window.scrollBy(0, -30);
      bottomedOut = true;
      console.log('bottomed');
    }

    setTimeout(function () {
      if (st >= $(document).height() - $(window).innerHeight() && $('#foo').length === 0) {
        $('body').append(`
          <div id="foo" style="height: 500px; background-color: #666">
            <h1 class="text-center">Force Pull</h1>
          </div>
        `);
      }
    }, 1000);
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

/*
* Sidekick Text Function
*/

$('.cursor-sidekick').each(function (index, element) {
  var sidekick = `
    <span class="hidden sidekick-text" id="sidekick${index}">
      ${element.getAttribute('data-text')}
    </span>`;

  $(this)
    .append(sidekick)
    .mouseenter(() => {
      $('#sidekick' + index).removeClass('hidden');
    })
    .mouseleave(() => {
      $('#sidekick' + index).addClass('hidden');
    })
    .mousemove((e) => {
      $('#sidekick' + index).css({ top: e.pageY + 10, left: e.pageX + 20 });
    });
});

$('.jedi-div').each(function (index, element) {

});
