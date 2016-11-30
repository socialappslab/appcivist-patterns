(function(appcvui, document, window) {

  appcvui.ProposalsAndIdeas = function(appContainerSelector) {
    this.themeWidget;
    this.initialize(appContainerSelector);
  };

  p = appcvui.ProposalsAndIdeas.prototype;

  p.constructor = appcvui.ProposalsAndIdeas;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;

    this.proposals = this.appEl.querySelectorAll('.card__proposal');
    this.ideas = this.appEl.querySelectorAll('.card__idea');

    this.showIdeasButton = this.appEl.querySelector('.proposals__show_ideas');
    this.hideIdeasButton = this.appEl.querySelector('.ideas__hide_ideas');

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
    };

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

    if( this.proposals != null ) {
      appcvui.forEach(this.proposals, this.initializeContextualMenu, this);
    }

    if( this.idas != null ) {
      appcvui.forEach(this.ideas, this.initializeContextualMenu, this);
    }

    document.addEventListener('resize', this.onResize);

    this.onResize();
  };

  p.onResize = function() {

    if(document.querySelector('.container__proposals') != null) {
      appcvui.equalHeights('.container__proposals .card__header');
      appcvui.equalHeights('.container__proposals .card__body .excerpt');
    }

    if(document.querySelector('.container__ideas') != null) {
      appcvui.equalHeights('.container__ideas .card__header');
    }
  };

  p.showIdeas = function(inst){
    inst.appEl.querySelector('.campaign_cards').classList.add('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  };

  p.hideIdeas = function(inst){
    inst.appEl.querySelector('.campaign_cards').classList.remove('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  };

  p.addProposal = function(inst){
    vex.open({
      unsafeContent: inst.appEl.querySelector('.form__add_proposal').innerHTML
    });
  };

  p.addIdea = function(self){
    vex.open({
      unsafeContent: self.appEl.querySelector('.form__add_idea').innerHTML
    });
  };

  p.initializeContextualMenu = function(i, el) {
    new appcvui.ContextualMenu(el);
  };

}(window.appcvui =  window.appcvui || {}, document, window));
