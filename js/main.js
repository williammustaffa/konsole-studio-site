$(document).ready(function(){


  //------------------------------------//
  //Navbar//
  //------------------------------------//
    	var menu = $('.navbar');
    	$(window).bind('scroll', function(e){
    		if($(window).scrollTop() > 140){
    			if(!menu.hasClass('open')){
    				menu.addClass('open');
    			}
    		}else{
    			if(menu.hasClass('open')){
    				menu.removeClass('open');
    			}
    		}
    	});


  //------------------------------------//
  //Scroll To//
  //------------------------------------//
  $(".scroll").click(function(event){
  	event.preventDefault();
  	$('html,body').animate({scrollTop:$(this.hash).offset().top - 40}, 800);

  });

  //------------------------------------//
  //Wow Animation//
  //------------------------------------//
  wow = new WOW({
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       false        // trigger animations on mobile devices (true is default)
  });

  wow.init();
  $("form#newsletter").on("submit", function(e) {
    var form = $(this);
    var button = form.find("button[type=submit]")
    var inputs = form.find("input");
    var formData = form.serialize();
    button.html(" Sending request");
    button.attr("disabled", "true");
    inputs.attr("disabled", "true");
    button.prepend($(document.createElement("i")).addClass("fa fa-spin fa-refresh"));

    var onError = function() {
      inputs.parent(".form-group").addClass("has-error");
      inputs.removeAttr("disabled");
      button.html(" Request failed");
      button.addClass("has-error");
      button.prepend($(document.createElement("i")).addClass("fa fa-times"));
      setTimeout(function() {
        button.removeClass("has-error");
        button.removeAttr("disabled");
        button.html("Try again");
      }, 2000);
    }

    var onSuccess = function() {
      inputs.parent(".form-group").removeClass("has-error");
      inputs.removeAttr("disabled");
      inputs.val("");
      button.html(" Request sent");
      button.addClass("has-success");
      button.prepend($(document.createElement("i")).addClass("fa fa-check"));
      setTimeout(function() {
        button.removeClass("has-success");
        button.removeAttr("disabled");
        button.html("Subscribe");
      }, 2000);
    }

    var handleAjaxSuccess = function(json) {
      var data = JSON.parse(json);
      if (data.done) {
        onSuccess();
      } else {
        onError();
      }
    };

    $.ajax({
      url: "mail.php",
      type: "POST",
      data: formData,
      success: function(json) {
        setTimeout( function() {
          handleAjaxSuccess(json);
        }, 1000);
      },
      error: function() {
        setTimeout( function() {
          onError();
        }, 1000);
      },
    });

    e.preventDefault();
  });
});
