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
    console.log( '»| campaign »»', this.contextualMenu );

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
;(function(appcvui, document, window, vex) {

  appcvui.ContextualMenu = function(element) {
    this.initialize(element);
  }

  p = appcvui.ContextualMenu.prototype;

  p.constructor = appcvui.ContextualMenu;

  p.initialize = function(el) {

    // console.log(":: instantiating :::", el );

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

  appcvui.Proposal = function(appContainerSelector) {
    this.initialize(appContainerSelector);
  }

  p = appcvui.Proposal.prototype;

  p.constructor = appcvui.Proposal;

  p.initialize = function(appContainerSelector) {

    this.appEl = document.querySelector(appContainerSelector);
    if( this.appEl == null ) return;

    this.contextualMenu = new appcvui.ContextualMenu( this.appEl.querySelector('.heading_actions'));
    console.log( '»| proposal single »»', this.contextualMenu );
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
    this.hideIdeasButton = this.appEl.querySelector('.ideas__hide_ideas');

    this.addProposalButton = this.appEl.querySelector('.proposals__add_new');
    this.addIdeaButton = this.appEl.querySelector('.ideas__add_new');

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

    if( this.idas != null ) {
      appcvui.forEach(this.ideas, this.initializeContextualMenu, this);
    }

    document.addEventListener('resize', this.onResize);

    this.onResize();
  };

  p.onResize = function() {

    if(document.querySelector('.container__proposals') != null) {
      appcvui.equalHeights('.container__proposals .card__header');
      appcvui.equalHeights('.container__proposals .card__body .excerpt');
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
    }, 250);
  };

  p.hideIdeas = function(inst){
    inst.appEl.querySelector('.campaign_cards').classList.remove('show-ideas');
    inst.showIdeasTimeout = window.setTimeout( function(){
      clearTimeout( inst.showIdeasTimeout );
      inst.onResize();
    }, 250);
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

    if(document.querySelector('.proposals_and_ideas') != null) {
      appcvui.proposalsAndIdeas = new appcvui.ProposalsAndIdeas('.proposals_and_ideas');
    } else if (document.querySelector('.proposals__only') != null) {
      appcvui.proposals = new appcvui.ProposalsAndIdeas('.proposals__only');
    };

    if(document.querySelector('.campaign') != null) {
      console.log("|»»", 'campaign');
      appcvui.campaign = new appcvui.Campaign('.campaign');
    }

    if(document.querySelector('.working_group') != null) {
      console.log("|»»", 'working group');
      appcvui.working_group = new appcvui.WorkingGroup('.working_group');
    }

    if(document.querySelector('.proposal__single') != null) {
      console.log("|»»", 'proposal single');
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

  }

}( window.appcvui =  window.appcvui || {}, document, window ));
