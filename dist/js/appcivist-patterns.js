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
;(function(appcvui, document, window, Chart) {

  var origResizeListener = Chart.helpers.addResizeListener;
  Chart.helpers.addResizeListener = function(node, callback){
    if(Chart.defaults.global.responsive){
      origResizeListener(node,callback);
    }
  };

  Chart.defaults.global.responsive = false;
  Chart.defaults.global.defaultFontFamily = 'Lato,sans-serif';

  Chart.defaults.global.legend.position = 'bottom';
  Chart.defaults.global.legend.fullWidth = 'true';

  Chart.defaults.global.elements.arc.borderWidth = 3;
  Chart.defaults.global.elements.arc.borderColor = "rgba(0,0,0,0.1)";

  appcvui.ConsensusChart = function(element) {
    this.initialize(element);
  }

  p = appcvui.ConsensusChart.prototype;

  p.constructor = appcvui.ConsensusChart;

  p.initialize = function(el) {
    this.el = el;
    this.data = this.el.getAttribute('data-chart-data');
  }

  p.setData = function(data) {
    this.data = data;
  }

  p.renderChart = function() {

    var context= this.el.querySelector('canvas').getContext('2d');
    var data = JSON.parse(this.data);

    this.chart = new Chart(context, {
      type: 'pie',
      data: data,
      options: {
        borderWidth: 0,
        usePointStyle: true,
        borderColor: "#000",
        bodyFontFamily: "Lato",
        legend: {
          boxWidth: 80,
          display: true,
          labels: {
            fontColor: '#fff'
          }
        }
      }
    });
  };

  p.redraw = function() {
    this.chart.render();
  }

}(window.appcvui =  window.appcvui || {}, document, window, window.Chart));
;(function(appcvui, document, window, vex) {

  appcvui.ConsensusWidget = function(element) {
    this.initialize(element);
  }

  p = appcvui.ConsensusWidget.prototype;

  p.constructor = appcvui.ConsensusWidget;

  p.initialize = function(el) {
    this.el = el;
    var popoverContent = this.el.querySelector('.consensus_result').innerHTML;
    var popover = new appcvui.PopOver(this.el);
    popover.setContent(popoverContent);
    var chart = new appcvui.ConsensusChart(popover.popoverContent.querySelector('.chart'));
    chart.renderChart();
    popover.setPosition();
    popover.beforeShow = chart.redraw.bind(chart);
  }

}(window.appcvui =  window.appcvui || {}, document, window));
;(function(appcvui, document, window, vex) {

  appcvui.ContextualMenu = function(element) {
    this.initialize(element);
  }

  p = appcvui.ContextualMenu.prototype;

  p.constructor = appcvui.ContextualMenu;

  p.initialize = function(el) {
    if(!el) {
      return;
    }
    this.hideMenuTimeoutDuration = 250;
    this.hideMenuTimeout = null;
    this.menuSelector = '.contextual_menu';
    this.actuatorSelector = '.action__contextual_menu';
    this.bodyClickEventListener = null;

    this.el = el;
    this.menu = this.el.querySelector(this.menuSelector);
    this.actuator = this.el.querySelector(this.actuatorSelector);

    this.actuator.addEventListener( 'mouseenter', function(e) {
      window.clearTimeout( this.hideMenuTimeout );
      this.showContextualMenu();
    }.bind(this));

    this.actuator.addEventListener( 'click', function(e) {
      e.preventDefault();
      this.showContextualMenu(true);
    }.bind(this));

    this.actuator.addEventListener( 'mouseleave', function(e) {
      if(!this.menu.classList.contains('stay')) {
        this.initiateContextualMenuTimeout();
      }
    }.bind(this));

    this.menu.addEventListener( 'mouseenter', function(e) {
      window.clearTimeout(this.hideMenuTimeout);
    }.bind(this));

    this.menu.addEventListener( 'mouseleave', function(e) {
      if(!this.menu.classList.contains('stay')) {
        this.initiateContextualMenuTimeout();
      }
    }.bind(this));

    /* @WARNING - this method is here only for demonstration purposes and is very much only to show the triggering of this modal'
      The prototype is not considering how to handle the triggering of contextual menu item bits.
    */
    this.menu.querySelector('.action__history').addEventListener('click', function(e){
      e.preventDefault();
      vex.open({
        unsafeContent: document.querySelector('.history-modal').innerHTML
      });
    })

  }

  p.showContextualMenu = function(stay) {

    this.setPosition();
    this.attachOnClikcOutside();

    if(stay) {
      this.el.classList.add('reveal_actions');
      this.actuator.classList.add('active');
      this.menu.classList.add('stay');
    }

    window.clearTimeout( this.hideMenuTimeout );
    this.menu.classList.add('active');
  }

  p.hideContextualMenu = function() {
    document.body.removeEventListener("click",this.bodyClickEventListener);
    window.clearTimeout( this.hideMenuTimeout );
    this.menu.classList.remove('active');
  }

  p.initiateContextualMenuTimeout = function() {
    window.clearTimeout( this.hideMenuTimeout );
    this.hideMenuTimeout = setTimeout( this.hideContextualMenu.bind(this), this.hideMenuTimeoutDuration);
  }

  p.attachOnClikcOutside = function() {
    this.bodyClickEventListener = document.body.addEventListener("click", function(e) {
      e.preventDefault();
      this.closeIfClickOutside(e);
    }.bind(this));
  }

  p.setPosition = function() {
    /*
     assumes:
      this.menu is positione absolute within a relatively positioned parent (this.el).
    */
    var rect = this.menu.parentElement.getBoundingClientRect();
    // console.log( this.menu );
    // console.log( this.menu.parentElement );
    // console.log( "»|»»", this.menu.parentElement.position() );

    this.menu.style.top = "1em";//( this.menu.parentElement.position().top -  document.body.scrollTop)  + 'px';
    this.menu.style.left = "auto";
    this.menu.style.right = 0;//( rect.width ) + 'px';
  }

  p.closeIfClickOutside = function(e) {
    window.clearTimeout( this.hideMenuTimeout );

    if( !this.menu.contains(e.target) && !this.actuator.contains(e.target)) {
      this.el.classList.remove('reveal_actions');
      this.actuator.classList.remove('active');
      this.menu.classList.remove('stay');
      this.hideContextualMenu();
    }
  }

}( window.appcvui =  window.appcvui || {}, document, window, window.vex ));
;(function(appcvui, document, window) {

  appcvui.PaceLoading = function () {
    this.initialize();
    return this;
  }

  p = appcvui.PaceLoading.prototype;

  p.constructor = appcvui.PaceLoading;

  p.initialize = function() {
    Pace.options = window.paceOptions;
    console.log (Pace.options);
  }

  p.start =  function (element) {
    Pace.start();
  }


  p.stop =  function (element) {
    Pace.stop();
  }

}( window.appcvui =  window.appcvui || {}, document, window, window.vex ));
;(function(window, document) {
  var appcvui = window.appcvui || {};

  appcvui.Navigation = function(appContainerSelector, navSelector) {
    this.initialize(appContainerSelector, navSelector);
  };

  p = appcvui.Navigation.prototype;

  p.constructor = appcvui.Navigation;

  p.initialize = function(appContainerSelector, navSelector) {
    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;
    this.el = document.querySelector(navSelector);
    if( this.el == null ) return;
    this.toggle = this.el.querySelector('.button__nav_toggle');
    this.toggle.addEventListener('click', this.toggleNav.bind(this));
  };

  p.toggleNav = function(e) {
    this.appEl.classList.toggle('nav--active');
    this.el.classList.toggle('nav--active');
  };
  window.appcvui = appcvui;
}(window, document));
;(function(appcvui, document, window) {

  appcvui.PopOver = function(element) {
    this.initialize(element);
    return this;
  }

  p = appcvui.PopOver.prototype;

  p.constructor = appcvui.PopOver;

  p.initialize = function(el) {

    this.hideTimeoutDuration = 250;
    this.hideTimeout = null;
    this.bodyClickEventListener = null;

    this.el = el;

    this.popover = document.createElement('div');
    this.popover.classList.add('popover');
    this.popoverContent = document.createElement('div');
    this.popoverContent.classList.add('content');
    this.popover.appendChild(this.popoverContent);
    this.el.appendChild( this.popover );

    // console.log("|»»", this.el, this.popover );

    this.el.addEventListener( 'mouseenter', function(e) {
      window.clearTimeout( this.hideTimeout );
      this.show();
    }.bind(this));

    this.el.addEventListener( 'click', function(e) {
      e.preventDefault();
      this.show(true);
    }.bind(this));

    this.el.addEventListener( 'mouseleave', function(e) {
      if(!this.popover.classList.contains('stay')) {
        this.initiateTimeout();
      }
    }.bind(this));

    this.popover.addEventListener( 'mouseenter', function(e) {
      window.clearTimeout(this.hideTimeout);
    }.bind(this));

    this.popover.addEventListener( 'mouseleave', function(e) {
      if(!this.popover.classList.contains('stay')) {
        this.initiateTimeout();
      }
    }.bind(this));

  }

  p.setContent = function( content ) {
    this.popoverContent.innerHTML = content;
  }

  p.show = function(stay) {

    // would probably be better as a event lister / emitter but hey
    if( this.beforeShow ) {
      this.beforeShow.call();
    }

    this.attachOnClikcOutside();

    if(stay) {
      this.el.classList.add('active');
      this.popover.classList.add('stay');
    }

    window.clearTimeout( this.hideTimeout );
    this.popover.classList.add('active');
    this.setPosition();

  }

  p.hide = function() {
    document.body.removeEventListener("click",this.bodyClickEventListener);
    window.clearTimeout( this.hideTimeout );
    this.popover.classList.remove('active');
  }

  p.initiateTimeout = function() {
    window.clearTimeout( this.hideTimeout );
    this.hideTimeout = setTimeout( this.hide.bind(this), this.hideTimeoutDuration);
  }

  p.attachOnClikcOutside = function() {
    this.bodyClickEventListener = document.body.addEventListener("click", function(e) {
      e.preventDefault();
      this.closeIfClickOutside(e);
    }.bind(this));
  }

  p.setPosition = function() {
    /*
     assumes:
      this.popover is positione absolute within a relatively positioned parent (this.el).
    */
    var fullHeight = this.popover.offsetHeight + parseInt(getComputedStyle(this.popover).paddingTop) + parseInt(getComputedStyle(this.popover).paddingBottom) + parseInt(getComputedStyle(this.popover).marginTop) + parseInt(getComputedStyle(this.popover).marginBottom);
    this.popover.style.top = ( -1 * (( fullHeight ) + 16 )) + "px";
  }

  p.closeIfClickOutside = function(e) {
    window.clearTimeout( this.hideTimeout );

    if( !this.popover.contains(e.target) && !this.el.contains(e.target)) {
      this.el.classList.remove('reveal_actions');
      this.el.classList.remove('active');
      this.el.classList.remove('stay');
      this.hide();
    }
  }

}( window.appcvui =  window.appcvui || {}, document, window, window.vex ));
;(function(appcvui, document, window) {

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

    appcvui.paceLoader.stop();

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
;(function(appcvui, document, window) {

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
        if(self.showIdeasButton.querySelector('.nav-label').textContent == "Hide Ideas") {
          self.hideIdeas(self);
          self.showIdeasButton.querySelector('.nav-label').textContent = "Show Ideas";
        } else {
          self.showIdeasButton.querySelector('.nav-label').textContent = "Hide Ideas";
          self.showIdeas(self);
        }
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

    document.addEventListener('eqResize', function(){
      this.onResize();
    }.bind(this));
  };

  p.onResize = function() {

    if(document.querySelector('.container__proposals') != null) {
      appcvui.equalHeights('.container__proposals .heading__working_group');
      appcvui.equalHeights('.container__proposals .heading--headline');
      appcvui.equalHeights('.container__proposals .title_block');
      appcvui.equalHeights('.container__proposals .card__header');
      appcvui.equalHeights('.container__proposals .card__body .excerpt');
      appcvui.equalHeights('.container__proposals .card__body');
    }

    if(document.querySelector('.container__ideas') != null) {
      appcvui.equalHeights('.container__ideas .card__header .heading--headline');
      appcvui.equalHeights('.container__ideas .card__header');
    }
  };

  p.showIdeas = function(inst){
    inst.appEl.querySelector('.campaign_cards').classList.add('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      console.log("SHOW RESIZE");
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 320);
  };

  p.hideIdeas = function(inst){
    console.log("HIDE RESIZE");
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
;(function(appcvui, document, window, vex) {

  appcvui.TemperatureCheck = function(element) {
    this.initialize(element);
  }

  p = appcvui.TemperatureCheck.prototype;

  p.constructor = appcvui.TemperatureCheck;

  p.initialize = function(el) {

    this.el = el;
    this.thumbsUp = this.el.querySelector('.upvote');
    this.thumbsDown = this.el.querySelector('.downvote');

    var upvote = new appcvui.PopOver(this.thumbsUp);
    upvote.setContent( this.thumbsUp.getAttribute('data-votecount') )
    upvote.setPosition();

    var downvote = new appcvui.PopOver(this.thumbsDown);
    downvote.setContent( this.thumbsDown.getAttribute('data-votecount') )
    downvote.setPosition();
  }

}(window.appcvui =  window.appcvui || {}, document, window));
;(function(appcvui, document, window, vex) {

  appcvui.ThemeWidget = function(selector) {
    this.initialize(selector);
  }

  p = appcvui.ThemeWidget.prototype;

  p.constructor = appcvui.ThemeWidget;

  p.initialize = function(selector, contentSelector) {
    this.el = document.querySelector(selector);
    this.content = this.el.querySelector('content');
    this.addFilterButton = this.el.querySelector('.button__add_filter');
    this.addFilterButton.addEventListener('click', this.showAvailableThemes.bind(this));
  }

  p.showAvailableThemes = function() {
    vex.open({
      unsafeContent: this.el.querySelector('.modal-content').innerHTML
    })
  }

}( window.appcvui =  window.appcvui || {}, document, window, window.vex ));
;( function(window, document){
  var appcvui = window.appcvui || {};
  window.paceOptions = {
    ajax: false,
    restartOnRequestAfter: false,
    document: false, // disabled
    eventLag: false, // disabled
    elements : {
      selectors: [".appmain"]
    }
  };


  appcvui.equalHeights = function(selector) {

    var elms = document.querySelectorAll(selector);
    var len = elms.length;
    var tallest = 0;
    var elm, elmHeight, x;

    for (x=0; x < len; x++) {
      elm = elms[x];
      elmHeight = elm.offsetHeight;
      tallest = (elmHeight > tallest) ? elmHeight : tallest;
    }

    for (x=0; x < len; x++) {
      elms[x].style.height = tallest + 'px';
    }
  };

  // https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
  // looping through the results of querySelectorAll is very useful.
  appcvui.forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
    }
  };

  // get nearest parent element matching selector
  appcvui.closest = function(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        break;
      }
      el = el.parentElement;
    }
    return el;
  }

  appcvui.initialize = function(){

    vex.defaultOptions.className = 'vex-theme-plain';
    appcvui.navigation = new appcvui.Navigation('.appcivist', '#appcivist__nav');
    appcvui.paceLoader = new appcvui.PaceLoading();
    appcvui.paceLoader.start();

    if(document.querySelector('.proposals_and_ideas') != null) {
      appcvui.proposalsAndIdeas = new appcvui.ProposalsAndIdeas('.proposals_and_ideas');
    } else if (document.querySelector('.proposals__only') != null) {
      appcvui.proposals = new appcvui.ProposalsAndIdeas('.proposals__only');
    };

    if(document.querySelector('.campaign') != null) {
      appcvui.campaign = new appcvui.Campaign('.campaign');
    }

    if(document.querySelector('.working_group') != null) {
      appcvui.working_group = new appcvui.WorkingGroup('.working_group');
    }

    if(document.querySelector('.proposal__single') != null) {
      appcvui.proposal = new appcvui.Proposal('.proposal__single');
    }
  };

  window.appcvui = appcvui;

}(window, document));
;(function(appcvui, document, window) {

  appcvui.WorkingGroup = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  }

  p = appcvui.WorkingGroup.prototype;

  p.constructor = appcvui.WorkingGroup;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;
    this.contextualMenu = new appcvui.ContextualMenu(this.appEl.querySelector('.heading_actions'));
    appcvui.paceLoader.stop();

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
