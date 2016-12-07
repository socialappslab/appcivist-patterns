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

    this.temperature_check = new appcvui.TemperatureCheck( this.appEl.querySelector('.page__header .temperature_check'));

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
