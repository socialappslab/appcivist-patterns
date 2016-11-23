(function(appcvui, document, window) {

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
    this.addProposalButton = this.appEl.querySelector('.proposals__add_new');

    var self = this;

    if( document.querySelector('.campaign__filters .filters') != null) {
      this.themeWidget = new appcvui.ThemeWidget('.campaign__filters .filters');
    };

    if( this.showIdeasButton != null ) {
      this.showIdeasButton.addEventListener('click', function(e) {
       e.preventDefault();
        self.showIdeas(self);
      });
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
      unsafeContent: self.appEl.querySelector('.form__add_proposal').innerHTML
    })
  }

}( window.appcvui =  window.appcvui || {}, document, window ));
