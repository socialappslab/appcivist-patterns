(function(appcvui, document, window) {

  appcvui.Campaign = function(appContainerSelector) {
    this.themeWidget;
    this.initialize(appContainerSelector);
  }

  p = appcvui.Campaign.prototype;

  p.constructor = appcvui.Campaign;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    this.showIdeasButton = this.appEl.querySelector('.proposals__show_ideas');
    this.hideIdeasButton = this.appEl.querySelector('.ideas__hide_ideas');
    this.addProposalButton = this.appEl.querySelector('.proposals__add_new');

    if( document.querySelector('.campaign__filters .filters') != null) {
      this.themeWidget = new appcvui.ThemeWidget('.campaign__filters .filters');
    }

    if( this.showIdeasButton != null ) {
      var self = this;
      this.showIdeasButton.addEventListener('click', function(e) {
       e.preventDefault();
        self.showIdeas(e, self);
      });
      this.hideIdeasButton.addEventListener('click', function(e) {
       e.preventDefault();
        self.hideIdeas(e, self);
      });
    }

    if( this.addProposalButton != null ) {
      this.addProposalButton.addEventListener('click', function(e) {
        vex.open({
          unsafeContent: this.el.querySelector('.modal_content__add_proposal').innerHTML
        })
      });
    }


    document.addEventListener('resize', this.onResize);

    this.onResize();
  }

  p.onResize = function() {
    appcvui.equalHeights('.container__proposals .card__header');
    appcvui.equalHeights('.container__proposals .card__body .excerpt');
    appcvui.equalHeights('.container__ideas .card__header');
  }

  p.showIdeas = function(e, inst){
    inst.appEl.querySelector('.campaign_cards').classList.add('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  }

  p.hideIdeas = function(e, inst){
    inst.appEl.querySelector('.campaign_cards').classList.remove('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  }

  p.addProposal = function(e, inst){

  }

  p.addIdea = function(e, inst){

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
