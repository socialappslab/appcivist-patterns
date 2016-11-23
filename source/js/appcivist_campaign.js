(function(appcvui, document, window) {

  appcvui.Campaign = function(appContainerSelector) {
    this.themeWidget;
    this.initialize(appContainerSelector);
  }

  p = appcvui.Campaign.prototype;

  p.constructor = appcvui.Campaign;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);

    this.themeWidget = new appcvui.ThemeWidget('.campaign__filters .filters');

    this.showIdeasButton = document.querySelector('.proposals__show_ideas');

    var self = this;
    if( this.showIdeasButton != null ) {

      this.showIdeasButton.addEventListener('click', function(e) {
       e.preventDefault();
        self.showIdeas(e, self);
      });

      this.hideIdeasButton = document.querySelector('.ideas__hide_ideas');
      this.hideIdeasButton.addEventListener('click', function(e) {
       e.preventDefault();
        self.hideIdeas(e, self);
      });

    }

    document.addEventListener('resize', this.onResize);

    this.onResize();
  }

  p.onResize = function() {

    console.log( "onresize||»»»»»");

    appcvui.equalHeights('.container__proposals .card__header');
    appcvui.equalHeights('.container__proposals .card__body .excerpt');

    appcvui.equalHeights('.container__ideas .card__header');
  }

  p.showIdeas = function(e, inst){
    inst.appEl.querySelector('.campaign_cards').classList.add('show-ideas');
    console.log( "<|", Date.now())
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
      console.log(Date.now(), "|>")
    }, 250);
  }

  p.hideIdeas = function(e, inst){
    inst.appEl.querySelector('.campaign_cards').classList.remove('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
  }

}( window.appcvui =  window.appcvui || {}, document, window ));
