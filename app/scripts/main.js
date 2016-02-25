'use strict';
$(document).ready(function() {
  // function resetQuery() {

  // }

  function startQuery() {
    $('#welcome').velocity("fadeOut", { duration: 350 });
    $('#query').velocity("fadeIn", { delay: 348, duration: 10 });
    $('#query1 h2').velocity("fadeIn", { delay: 350, duration: 300 });
    $('#query1 .box').velocity("transition.flipXIn", { stagger: 150, delay: 350, duration: 350, display: "inline-block" });
  }

  function gotoQuery2() {
    $('#query1 h2').velocity("fadeOut", { delay: 0, duration: 250, display: 'block' });
    $('#query1 .box').velocity("transition.fadeOut", 
      { stagger: 150, duration: 350, delay: 150, display: "inline-block", opacity: 0,
      complete: function() {
        $('#query1').css('display', 'none');
        $('#query2').css('display', 'block');
        $('#query2 h2').velocity("fadeIn", { delay: 0, duration: 300 });
        $('#query2 .box').velocity("transition.flipXIn", { stagger: 150, delay: 50, duration: 350, display: "inline-block" });
      }});
  }

  function gotoQuery3() {
    $('#query2 h2').velocity("fadeOut", { delay: 0, duration: 250, display: 'block' });
    $('#query2 .box').velocity("transition.fadeOut", 
      { stagger: 150, duration: 350, delay: 150, display: "inline-block", opacity: 0,
      complete: function() {
        $('#query2').css('display', 'none');
        $('#query3').css('display', 'block');
        $('#query3 h2').velocity("fadeIn", { delay: 0, duration: 300 });
        $('#query3 .box').velocity("transition.flipXIn", { stagger: 150, delay: 50, duration: 350, display: "inline-block" });
      }});
  }

  $('#start-query').on('click', function(e) {
    e.preventDefault();
    startQuery();
  });

  $('#query1 .box a').on('click', function(e) {
    e.preventDefault()
    gotoQuery2();
  });

  $('#query2 .box a').on('click', function(e) {
    e.preventDefault()
    gotoQuery3();
  });

});
