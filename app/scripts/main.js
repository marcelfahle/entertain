'use strict';
/*global enquire, createjs */
$(document).ready(function() {
  //var currentOverview = 'internet-kabel-full';
  // function resetQuery() {

  // }
  //
  //
  //
  $('body').attr('data-s', 'mobile');

  function getOverview() {
    var c = $('body').attr('data-connect');
    var t = $('body').attr('data-type');
    var s = $('body').attr('data-s');

    $('#result').removeClass();

    $('#result').addClass('res-' + c + '-' + t);

    return '.' + c + '-' + t + '-' + s;
  }
  // PRELOADER
  //
  //
  var queue = new createjs.LoadQueue(),
    $progress = $('#progress'),
    $progressbar = $('#progressbar .bar');




  queue.loadManifest([
    { id: '1', src: '../images/overview-internet-kabel-full.png' },
    { id: '2', src: '../images/overview-internet-lan-full.png' },
    { id: '3', src: '../images/overview-internet-powerline-full.png' },
    { id: '4', src: '../images/overview-satellit-kabel-full.png' },
    { id: '5', src: '../images/overview-satellit-lan-full.png' },
    { id: '6', src: '../images/overview-satellit-powerline-full.png' },
    { id: '7', src: '../images/overview-internet-kabel-mobile.png' },
    { id: '8', src: '../images/overview-internet-lan-mobile.png' },
    { id: '9', src: '../images/overview-internet-powerline-mobile.png' },
    { id: '10', src: '../images/overview-satellit-kabel-mobile.png' },
    { id: '11', src: '../images/overview-satellit-lan-mobile.png' },
    { id: '12', src: '../images/overview-satellit-powerline-mobile.png' },
    { id: '13', src: '../images/steps-01-00-router.png' },
    { id: '15', src: '../images/steps-mobile-01-00-router.png' },
    { id: '16', src: '../images/steps-02-00-computer.png' },
    { id: '17', src: '../images/steps-mobile-02-00-computer.png' },
    { id: '18', src: '../images/steps-03-00-telefon.png' },
    { id: '19', src: '../images/steps-mobile-03-00-telefon.png' },
    { id: '20', src: '../images/steps-04--01-04-receiver.png' },
    { id: '21', src: '../images/steps-mobile-04--01-04-receiver.png' },
    { id: '22', src: '../images/steps-04--02-receiver.png' },
    { id: '23', src: '../images/steps-mobile-04--02-receiver.png' },
    { id: '24', src: '../images/steps-04--03-receiver.png' },
    { id: '25', src: '../images/steps-mobile-04--03-receiver.png' },
    { id: '26', src: '../images/steps-04--05-receiver.png' },
    { id: '27', src: '../images/steps-mobile-04--05-receiver.png' },
    { id: '28', src: '../images/steps-04--06-receiver.png' },
    { id: '29', src: '../images/steps-mobile-04--06-receiver.png' }

  ]);



  function onComplete() {
    $('#preloaderwrap').remove();
    $('#welcome').velocity('fadeIn', 350);
  }

  function onError() {
  }

  function onFileLoad() {
  }
  function onFileProgress() {
    //console.log('File progress', event);
  }

  function onProgress(event) {
    var progress = Math.round(event.loaded * 100);

    //console.log('General progress', Math.round(event.loaded) * 100, event);
    $progress.text(progress + '%');
    $progressbar.css({
      'width': progress + '%'
    });
  }



  queue.on('complete', onComplete);
  queue.on('error', onError);
  queue.on('fileload', onFileLoad);
  queue.on('fileprogress', onFileProgress);
  queue.on('progress', onProgress);
  // PRELOADER - end




  enquire.register('screen and (min-width:47.5em)', {
    match: function() {
      $('body').attr('data-s', 'full');
      // currentOverview = 'internet-kabel-full'  // only last part change, after last -
      $('#result .overview img').velocity('transition.flipXOut', {
        queue: false,
        complete: function() {
          $(getOverview()).velocity('transition.flipXIn', {delay: 50});
        }
      });
    },

    unmatch: function() {
      $('body').attr('data-s', 'mobile');
      $('#result .overview img').velocity('transition.flipXOut', {
        queue: false,
        complete: function() {
          $(getOverview()).velocity('transition.flipXIn', {delay: 50});
        }
      });
    }
  }, true);

  //
  var n = $('#query .query').length;
  for (var i = 0; i < n; i++) {
    $('.status-indicator-wrapper ul').append('<li></li>');
  }
  $('.status-indicator-wrapper ul li').first().addClass('active');


  var currentResultBox = 0;


  function scrollViewTo(to) {
    var t = to;
    if ($('body').attr('data-connect') === 'internet' && to === 5) {
      t = to + 1;
    }
    $('#result .box').eq(t).velocity('scroll', { duration: 500, easing: 'easeOut', offset: -50 });
    if (to >= $('#result .box').length - 1) {
      currentResultBox = -1;
    }
    console.log('scrolling', to, $('#result .box').length, $('#result .box').eq(to));
  }

  $('.hotspots li').on('mouseover', function() {
    $(this).velocity(
      {
        scale: 1.5
      }, 350, [80, 10]
    );
  });
  $('.hotspots li').on('mouseout', function() {
    $(this).velocity({scale: 1}, {
      duration: 350
    });

  });

  $('.hotspots li').on('click', function() {
    console.log($(this).index());
    currentResultBox = $(this).index() + 1;
    scrollViewTo(currentResultBox);
  });


  function startQuery() {
    $('#welcome').velocity('fadeOut', { duration: 350 });
  }

  function hideHotspots() {
    $('li.hs').velocity('fadeOut', { duration: 150 });
  }
  function showHotspots() {
    console.log('showing');
    $('li.hs').velocity('transition.bounceIn', { delay: 100, duration: 350, stagger: 100 });
  }

  $('.subcats li a').on('click', function(e) {
    e.preventDefault();
    if(!$(this).parent().hasClass('active')) {
      $('.subcats li').removeClass('active');
      $(this).parent().addClass('active');
      $('body').attr( 'data-type', $(this).attr('data-connect') );

      $('#result .overview img').velocity('transition.flipXOut', {
        queue: false,
        complete: function() {
          $(getOverview()).velocity('transition.flipXIn',
            {
              delay: 50,
              complete: function() {
                showHotspots();
              }
            }
          );
        }
      });

      hideHotspots();

    }
});



  function gotoNextQuestion(trigger) {
    var $current = $(trigger).closest('.query');
    var $next = $current.next();

    $current.find('h2').velocity('fadeOut', { delay: 0, duration: 250, display: 'block' });
    $current.find('.box').velocity('transition.fadeOut',
      { stagger: 150, duration: 350, delay: 150, display: '', opacity: 0,
      complete: function() {
        $current.css('display', 'none');
        $next.css('display', 'block');
        $next.find('h2').velocity('fadeIn', { delay: 0, duration: 300 });
        $next.find('.box').velocity('transition.flipXIn', { stagger: 150, delay: 50, duration: 350, display: '' });
      }}
    );
    $('.status-indicator-wrapper ul li.active').velocity({backgroundColor: '#dcdcdc'}, {duration: 250, complete: function(el) {$(el).removeClass('active'); }});
    var idx = $('#query .query').index($next);
    //$('.status-indicator-wrapper ul li').eq(idx).addClass('active');
    $('.status-indicator-wrapper ul li').eq(idx).velocity({backgroundColor: '#e20074'}, {duration: 250, complete: function(el) {$(el).addClass('active'); }});
  }

  function showResult(trigger) {
    var $currentSection = $(trigger).closest('section');
    //var $result = $('#result');

    $currentSection.velocity('transition.flipYOut', {
      display: 'none',
      complete: function() {
        $('#result').css('display', 'block');
        $('#result .overview img').hide();
        $(getOverview()).velocity('transition.flipXIn', {});
        $('#result .box').velocity('transition.flipXIn', { stagger: 150, delay: 50, display: 'block'});
      }
    });
    $('body').velocity('scroll', { duration: 1500, easing: 'easeOut' });
  }


  $('#start-query').on('click', function(e) {
    e.preventDefault();
    startQuery();
  });

  $('.query .box a').on('click', function(e) {
    e.preventDefault();
    var $query = $(this).closest('.query');
    $('body').attr( 'data-connect', $(this).attr('data-a') );
    if ($query.is($('.query:last'))) {
      showResult(this);
    } else {
      gotoNextQuestion(this);
    }
  });

  $('.small-menu-trigger').on('click', function(e) {
    e.preventDefault();
    if ($(this).closest('.small-nav').hasClass('show')) {
      $(this).next('ul').velocity('slideUp',
        {
          duration: 150,
          display: 'none'
        }
      );
      $(this).closest('.small-nav').removeClass('show');
      $('body, html').css('overflow', 'auto');
    } else {

      $(this).next('ul').velocity('slideDown',
        {
          duration: 150,
          display: 'block'
        }
      );
      $('body').velocity('scroll', {duration: 150, easing: 'easeInBack'});
      $(this).closest('.small-nav').addClass('show');
      $('body, html').css('overflow', 'hidden');
    }
  });



});
