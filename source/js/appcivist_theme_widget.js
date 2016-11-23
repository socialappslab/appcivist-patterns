(function(appcvui, document, window, vex) {

  appcvui.ThemeWidget = function(selector) {
    this.initialize(selector);
  }

  p = appcvui.ThemeWidget.prototype;

  p.constructor = appcvui.ThemeWidget;

  p.initialize = function(selector, contentSelector) {
    this.el = document.querySelector(selector);
    this.content = this.el.querySelector('content');
    this.addFilterButton = this.el.querySelector('.button__add_filter');
    console.log("ThemeWidget.initialize");
    this.addFilterButton.addEventListener('click', this.showAvailableThemes.bind(this));
  }

  p.showAvailableThemes = function() {

    vex.open({
      unsafeContent: this.el.querySelector('.modal-content').innerHTML
    })

  }

}( window.appcvui =  window.appcvui || {}, document, window, window.vex ));
