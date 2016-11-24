(function(appcvui, document, window) {

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
