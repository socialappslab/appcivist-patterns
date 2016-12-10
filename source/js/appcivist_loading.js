(function(appcvui, document, window) {

  appcvui.PaceLoading = function () {
    this.initialize();
    return this;
  }

  p = appcvui.PaceLoading.prototype;

  p.constructor = appcvui.PaceLoading;

  p.initialize = function() {
    Pace.options = window.paceOptions;
    console.log (Pace.options);
  }

  p.start =  function (element) {
    Pace.start();
  }


  p.stop =  function (element) {
    Pace.stop();
  }

}( window.appcvui =  window.appcvui || {}, document, window, window.vex ));
