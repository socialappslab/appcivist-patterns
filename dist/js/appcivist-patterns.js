(function(window, document) {
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
;(function(appcvui, document, window) {

  appcvui.Proposal = function(appContainerSelector) {
    this.themeWidget;
    this.initialize(appContainerSelector);
  }

  p = appcvui.Proposal.prototype;

  p.constructor = appcvui.Proposal;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
;(function(appcvui, document, window) {

  appcvui.Campaign = function(appContainerSelector) {
    this.themeWidget;
    this.initialize(appContainerSelector);
  }

  p = appcvui.Campaign.prototype;

  p.constructor = appcvui.Campaign;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;

    this.showIdeasButton = this.appEl.querySelector('.proposals__show_ideas');
    this.hideIdeasButton = this.appEl.querySelector('.ideas__hide_ideas');

    console.log("»|»»",this.hideIdeasButton);

    this.addProposalButton = this.appEl.querySelector('.proposals__add_new');
    this.addIdeaButton = this.appEl.querySelector('.ideas__add_new');

    var self = this;

    if( document.querySelector('.campaign__filters .filters') != null) {
      this.themeWidget = new appcvui.ThemeWidget('.campaign__filters .filters');
    };

    if( this.showIdeasButton != null ) {
      this.showIdeasButton.addEventListener('click', function(e) {
       e.preventDefault();
        self.showIdeas(self);
      });
    }

    if( this.hideIdeasButton != null ) {
      this.hideIdeasButton.addEventListener('click', function(e) {
       e.preventDefault();
        self.hideIdeas(self);
      });
    };

    if( this.addProposalButton != null ) {
      this.addProposalButton.addEventListener('click', function(e) {
        e.preventDefault();
        self.addProposal(self);
      });
    };

    if( this.addIdeaButton != null ) {
      this.addIdeaButton.addEventListener('click', function(e) {
        e.preventDefault();
        self.addIdea(self);
      });
    };

    document.addEventListener('resize', this.onResize);

    this.onResize();
  }

  p.onResize = function() {
    appcvui.equalHeights('.container__proposals .card__header');
    appcvui.equalHeights('.container__proposals .card__body .excerpt');
    appcvui.equalHeights('.container__ideas .card__header');
  }

  p.showIdeas = function(inst){
    inst.appEl.querySelector('.campaign_cards').classList.add('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  }

  p.hideIdeas = function(inst){
    inst.appEl.querySelector('.campaign_cards').classList.remove('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  }

  p.addProposal = function(inst){
    vex.open({
      unsafeContent: inst.appEl.querySelector('.form__add_proposal').innerHTML
    })
  }

  p.addIdea = function(self){
    vex.open({
      unsafeContent: self.appEl.querySelector('.form__add_idea').innerHTML
    })
  }

}( window.appcvui =  window.appcvui || {}, document, window ));
;(function(appcvui, document, window, vex) {

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
    if( document.querySelectorAll('.appmain .proposals_and_ideas') != null ) {
      appcvui.campaign = new appcvui.Campaign('.proposals_and_ideas');
    }
  };

  window.appcvui = appcvui;

}( window, document));
