function l(o) {console.log(o);}
// Dirty dirty JQuery

// ------------------------------ Implémentation du défilement régulier, ce qui est une raison apparente du piratage du défilement ne fonctionne pas dans Firefox ---------------
function scrollIt(element) {  
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': element.offsetTop
  });
}

function on_submit()
{
    document.getElementById("confirm_message").innerHTML="Vous voyagez à "+"<font color='red'>"+document.getElementById("destination").value+"</font>"+" de "+"<font color='red'>"+document.getElementById("source").value+"</font>";
}

function to_section_two()
{
    //alert("v");
    scrollIt(document.getElementsByClassName("two")[0]);
}

function to_section_three()
{
    //alert("v");
    scrollIt(document.getElementsByClassName("three")[0]);
    document.getElementsByClassName("slider")[0].classList.remove("section_three_hide");
}


function to_section_last()
{
    // alert("last ");
    
    scrollIt(document.getElementsByClassName("last")[0]);
    document.getElementsByClassName("slider")[0].classList.add("section_three_hide");
    
  
}




function to_section_one()
{
    //alert("v");
    scrollIt(document.getElementsByClassName("one")[0]);
}

/*
to scroll smoothly without click , on the personal project galery
*/

// here onmouseenter event i am click a Anchor tag 
function move(x) {
  var timer;
  var element = document.getElementById('sliders');
	var delayInMilliseconds = 1000; //1 second
	//added delay to avoid quick smooth scroll event
	setTimeout(function() {
  //your code to be executed after 1 second


  console.log(x.id);
  x.width='1000px';
	var anchor = document.createElement("a");  	 anchor.href = "#"+x.id;
	anchor.style.display="none";
	x.appendChild(anchor);
  anchor.click();
  x.removeChild(anchor);
	}, delayInMilliseconds);
}

function removeMove(x)
{
  var element = document.getElementById('sliders');
}



/**
 * hover disable on scroll
 */




// ---------------------------------------- C'est l'implémentation de Scroll Hijack pour scroll , Je viens d’un code penn --------------------
$(document).ready(function () {

  var sections = $('.box').toArray();

  var scroll = {
    activeSection: 0,
    sectionCount: sections.length - 1,
    isThrottled: false,
    throttleDuration: 1000,
    target: $(sections[0]).position().top };

    $("#geoCultura div div input").click(function() {
        $(this).focus();
      });


  function setSizes() {
    for (var i = 0; i < sections.length; i++) {if (window.CP.shouldStopExecution(0)) break;

      $(sections[i]).css({
        'top': window.innerHeight * i,
        'height': window.innerHeight,
        'width': window.innerWidth });

    }window.CP.exitedLoop(0);
  }

  setSizes();
  $('body').on('resize', setSizes());

  function downSection() {
    // var positionFromTop = $(sections[scroll.activeSection + 1]).position().top;
    // $("body, html").animate({ "scrollTop": positionFromTop }, 300);
    // ++scroll.activeSection;
  }

  function upSection() {
    // var positionFromTop = $(sections[scroll.activeSection - 1]).position().top;
    // $("body, html").animate({ "scrollTop": positionFromTop }, 300);
    // --scroll.activeSection;
  }

  $("body").hammer({ preventDefault: true }).on("swipe", function (event) {
    if (event.gesture.direction == 'up') {
      if (scroll.activeSection != sections.length - 1) {
        downSection();
        l('SWIPED UP');
      }
    } else if (event.gesture.direction == 'down') {
      if (scroll.activeSection != 0) {
        upSection();
        l('SWIPED DOWN');
      }
    }
  });

  $(window).on('scroll', function (e) {
    e.preventDefault();
  });

  $(window).on('mousewheel', function (event) {
    event.preventDefault();

    if (scroll.isThrottled) {return;}
    scroll.isThrottled = true;

    setTimeout(function () {
      scroll.isThrottled = false;
    }, scroll.throttleDuration);

    if (event.originalEvent.wheelDelta > 0) {

      if (scroll.activeSection === 0) return false;
      upSection();
      l('WHEELED DOWN');

    } else {

      if (scroll.activeSection >= scroll.sectionCount) return false;
      downSection();
      l('WHEELED UP');

    }
  });


  $(window).keydown(function (e) {

    if (e.keyCode == 40 && scroll.activeSection != sections.length - 1) {

      downSection();
      l('ARROW DOWN');

    } else if (e.keyCode == 38 && scroll.activeSection != 0) {

      upSection();
      l('ARROW UP');

    }

  });

}); // end doc ready
      //# sourceURL=pen.js