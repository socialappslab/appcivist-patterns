(function(appcvui, document, window, vex) {

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
