( function(window, document){
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

    appcvui.paceLoader = new appcvui.PaceLoading('.appcivist');
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
