(function(appcvui, document, window, vex) {

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
