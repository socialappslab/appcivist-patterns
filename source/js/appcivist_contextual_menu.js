(function(appcvui, document, window, vex) {

  appcvui.ContextualMenu = function(selector) {
    this.initialize(selector);
  }

  p = appcvui.ContextualMenu.prototype;

  p.constructor = appcvui.ContextualMenu;

  p.initialize = function(el) {

    console.log(":: instantiating :::", el.querySelector('.heading--headline a').textContent );

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

  }

  p.showContextualMenu = function(stay) {
    console.log('showContextualMenu', stay);

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
