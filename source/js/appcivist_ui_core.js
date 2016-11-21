var appcvui = ( function(appcvui, document, window){

  appcvui.equalHeights = function(selector) {

    var elms = document.querySelectorAll(selector);
    var len = elms.length;
    var tallest = 0;
    var elm, elmHeight, x;

    for (x=0; x < len; x++) {
      elm = elms[x];
      elmHeight = elm.offsetHeight;
      tallest = (elmHeight > tallest) ? elmHeight : tallest;
    }

    for (x=0; x < len; x++) {
      elms[x].style.height = tallest + 'px';
    }
  }

  appcvui.initialize = function(){
    appcvui.equalHeights('.list__cards .proposal__card header');
    appcvui.equalHeights('.list__cards .proposal__card .card__body');
    appcvui.navigation = new appcvui.Navigation('.app-container', '#appcivist__nav');
  }

  document.onreadystatechange = function () {
    if (document.readyState === "interactive") {
      console.log('document.readyState === interactive');
      appcvui.initialize();
    }
  }

}( window.appcvui = window.appcvui || {}, document, window));
