(function(appcvui, document, window) {

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
    this.popover.style.top = ( -1 * ( fullHeight )) + "px";
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
