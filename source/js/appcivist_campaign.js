(function(appcvui, document, window) {

  appcvui.Campaign = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  }

  p = appcvui.Campaign.prototype;

  p.constructor = appcvui.Campaign;

  p.initialize = function(appContainerSelector) {
    this.appEl = document.querySelector(appContainerSelector);
  }

  p.showThemeFilters = function(e) {
    this.addProposalModal = this.appEl.querySelector('#modal__add_proposal');
    console.log("»»»", this.addProposalModal);
  }

}( window.appcvui =  window.appcvui || {}, document, window ));
