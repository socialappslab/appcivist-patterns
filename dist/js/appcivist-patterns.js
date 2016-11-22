(function(appcvui, document, window) {

  appcvui.Campaign = function(appContainerSelector) {
    this.themeWidget;
    this.initialize(appContainerSelector);
  }

  p = appcvui.Campaign.prototype;

  p.constructor = appcvui.Campaign;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);

    this.themeWidget = new appcvui.ThemeWidget('.campaign__filters .filters');

    this.showIdeasButton = document.querySelector('.proposals__show_ideas');

    var self = this;
    this.showIdeasButton.addEventListener('click', function(e) {
     e.preventDefault();
      self.showIdeas(e, self);
    });

    window.addEventListener('resize', this.onResize);

    this.onResize();
  }

  p.onResize = function() {

    appcvui.equalHeights('.container__proposals .card__header');
    appcvui.equalHeights('.container__proposals .card__body .excerpt');

    appcvui.equalHeights('.container__ideas .card__header');
    appcvui.equalHeights('.container__ideas .card__body');
  }

  p.showIdeas = function(e, inst){
    inst.appEl.querySelector('.campaign_cards').classList.add('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      console.log("wooooot");
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  }

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
;(function(appcvui, document, window, vex) {

  appcvui.ThemeWidget = function(selector) {
    console.log("ThemeWidget");
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
;( function(window, document){
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
    vex.defaultOptions.className = 'vex-theme-plain';
    appcvui.navigation = new appcvui.Navigation('.appcivist', '#appcivist__nav');
    if( typeof document.querySelector('.campaign') != null ) {
      appcvui.campaign = new appcvui.Campaign('.campaign');
    }
  };

  // don't call this here, just exponse de initialize() method and called when is needed.
  //document.onreadystatechange = function () {
    //if (document.readyState === "interactive") {
      //appcvui.initialize();
    //}
  //}
  
  window.appcvui = appcvui;
}( window, document));
