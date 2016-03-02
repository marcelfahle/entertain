'use strict';
$(document).ready(function() {
  // function resetQuery() {

  // }
  var n = $('#query .query').length;
  for (var i = 0; i < n; i++) {
    $('.status-indicator-wrapper ul').append('<li></li>');
  }
  $('.status-indicator-wrapper ul li').first().addClass('active');


  var currentResultBox = 0;

  function startQuery() {
    $('#welcome').velocity('fadeOut', { duration: 350 });
    $('#query').velocity('fadeIn', { delay: 348, duration: 10 });
    $('#query1 h2').velocity('fadeIn', { delay: 350, duration: 300 });
    $('#query1 .box').velocity('transition.flipXIn', { stagger: 150, delay: 350, duration: 350, display: '' });
  }

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
        $('#result .box').velocity('transition.flipXIn', { stagger: 150, delay: 50, display: 'block'});
      }
    });
    $('body').velocity('scroll', { duration: 1500, easing: 'easeOut' });
  }

  $('.stepper a').on('click', function() {
    currentResultBox++;
    $('#result .box').eq(currentResultBox).velocity('scroll', { duration: 500, easing: 'easeOut' });
    if (currentResultBox >= $('#result .box').length - 1) {
      currentResultBox = -1;
    }
  });


  $('#start-query').on('click', function(e) {
    e.preventDefault();
    startQuery();
  });

  $('.query .box a').on('click', function(e) {
    e.preventDefault();
    var $query = $(this).closest('.query');
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
