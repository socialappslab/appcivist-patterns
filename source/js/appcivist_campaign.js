(function(appcvui, document, window) {

  appcvui.Campaign = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  }

  p = appcvui.Campaign.prototype;

  p.constructor = appcvui.Campaign;

  p.initialize = function(appContainerSelector) {
    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;
    this.contextualMenu = new appcvui.ContextualMenu(this.appEl.querySelector('.heading_actions'));
    appcvui.paceLoader.stop();
  }

}( window.appcvui =  window.appcvui || {}, document, window ));
