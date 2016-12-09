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

    this.tempChecks = this.appEl.querySelectorAll('.temperature_check');
    this.consensusWidgets = this.appEl.querySelectorAll('.consensus_widget');

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

    if( this.ideas != null ) {
      appcvui.forEach(this.ideas, this.initializeContextualMenu, this);
    }

    if( this.tempChecks != null ) {
      appcvui.forEach(this.tempChecks, this.initializeTemperatureCheck, this);
    }

    if( this.consensusWidgets != null ) {
      appcvui.forEach(this.consensusWidgets, this.initializeConsensusWidget, this);
    }

    document.addEventListener('resize', this.onResize);

    // this.onResize();

    document.addEventListener('eqResize', function(){
      this.onResize();
      console.log("eqResize")
    }.bind(this));
  };

  p.onResize = function() {

    if(document.querySelector('.container__proposals') != null) {
      appcvui.equalHeights('.container__proposals .title_block');
      appcvui.equalHeights('.container__proposals .heading__working_group');
      appcvui.equalHeights('.container__proposals .card__header');
      appcvui.equalHeights('.container__proposals .card__body .excerpt');
      appcvui.equalHeights('.container__proposals .card__body');
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
    }, 320);
  };

  p.hideIdeas = function(inst){
    inst.appEl.querySelector('.campaign_cards').classList.remove('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 320);
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
    new appcvui.ContextualMenu(el.querySelector('.card__heading_actions'));
  };

  p.initializeTemperatureCheck = function(i, el) {
    new appcvui.TemperatureCheck( el );
  }

  p.initializeConsensusWidget = function(i, el) {
    new appcvui.ConsensusWidget(el);
  }

}(window.appcvui =  window.appcvui || {}, document, window));
