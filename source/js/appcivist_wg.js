(function(appcvui, document, window) {

  appcvui.WorkingGroup = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  }

  p = appcvui.WorkingGroup.prototype;

  p.constructor = appcvui.WorkingGroup;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);

    if( this.appEl == null ) return;
    this.startVotingButton = this.appEl.querySelector('.action__startvoting');
    this.votingEnabled = false;
    new appcvui.ContextualMenu(this.appEl.querySelector('.heading_actions'));
    console.log("Initializing Group Menu")
    var self = this;

    if( this.startVotingButton != null ) {
      this.startVotingButton.addEventListener('click', function(e) {
        e.preventDefault();
        self.startVoting(self);
      });
    };
    appcvui.paceLoader.stop();
  }
  p.startVoting = function(inst){
    inst.votingEnabled = true;
    vex.open({
      unsafeContent: inst.appEl.querySelector('.form__start_voting').innerHTML
    });
  };
}( window.appcvui =  window.appcvui || {}, document, window ));
