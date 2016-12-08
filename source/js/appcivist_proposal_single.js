(function(appcvui, document, window) {

  appcvui.Proposal = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  }

  p = appcvui.Proposal.prototype;

  p.constructor = appcvui.Proposal;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;

    this.contextualMenu = new appcvui.ContextualMenu( this.appEl.querySelector('.heading_actions'));

    if( this.appEl.querySelector('.page__header .temperature_check') != null ) {
      this.temperature_check = new appcvui.TemperatureCheck( this.appEl.querySelector('.page__header .temperature_check'));
    }

    if( this.appEl.querySelector('.page__header .consensus_widget') != null ) {
      this.temperature_check = new appcvui.ConsensusWidget( this.appEl.querySelector('.page__header .consensus_widget'));
    }

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
