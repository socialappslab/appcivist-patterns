(function(appcvui, document, window, Chart) {

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
