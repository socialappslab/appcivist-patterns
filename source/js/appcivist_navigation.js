(function(window, document) {
  var appcvui = window.appcvui || {};

  appcvui.Navigation = function(appContainerSelector, navSelector) {
    this.initialize(appContainerSelector, navSelector);
  };

  p = appcvui.Navigation.prototype;

  p.constructor = appcvui.Navigation;

  p.initialize = function(appContainerSelector, navSelector) {
    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;
    this.el = document.querySelector(navSelector);
    if( this.el == null ) return;
    this.toggle = this.el.querySelector('.button__nav_toggle');
    this.toggle.addEventListener('click', this.toggleNav.bind(this));
  };

  p.toggleNav = function(e) {
    this.appEl.classList.toggle('nav--active');
    this.el.classList.toggle('nav--active');
  };
  window.appcvui = appcvui;
}(window, document));
