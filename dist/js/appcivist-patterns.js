(function(window, document) {
  var appcvui = window.appcvui || {};

  appcvui.Campaign = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  };

  p = appcvui.Campaign.prototype;

  p.constructor = appcvui.Campaign;

  p.initialize = function(appContainerSelector) {
    this.appEl = document.querySelector(appContainerSelector);
  };

  p.showThemeFilters = function(e) {
    this.addProposalModal = this.appEl.querySelector('#modal__add_proposal');
    console.log("»»»", this.addProposalModal);
  };

  window.appcvui = appcvui;
}( window.appcvui =  window.appcvui || {}, document, window ));
;(function(window, document) {
  var appcvui = window.appcvui || {};

  appcvui.Navigation = function(appContainerSelector, navSelector) {
    this.initialize(appContainerSelector, navSelector);
  };

  p = appcvui.Navigation.prototype;

  p.constructor = appcvui.Navigation;

  p.initialize = function(appContainerSelector, navSelector) {
    this.appEl = document.querySelector(appContainerSelector);
    this.el = document.querySelector(navSelector);
    this.toggle = this.el.querySelector('.button__nav_toggle');
    this.toggle.addEventListener('click', this.toggleNav.bind(this));
  };

  p.toggleNav = function(e) {
    this.appEl.classList.toggle('nav--active');
    this.el.classList.toggle('nav--active');
  };
  window.appcvui = appcvui;
}(window, document));
;(function(window, document){

  var appcvui = window.appcvui || {};
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
  };

  appcvui.initialize = function(){
    appcvui.equalHeights('.list__cards .proposal__card header');
    appcvui.equalHeights('.list__cards .proposal__card .card__body');
    appcvui.navigation = new appcvui.Navigation('.app-container', '#appcivist__nav');
  };

  window.appcvui = appcvui;
}( window, document));
