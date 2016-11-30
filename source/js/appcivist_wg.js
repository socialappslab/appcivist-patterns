(function(appcvui, document, window) {

  appcvui.WorkingGroup = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  }

  p = appcvui.WorkingGroup.prototype;

  p.constructor = appcvui.WorkingGroup;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;
    this.contextualMenu = new appcvui.ContextualMenu(this.appEl.querySelector('.heading_actions'));

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
