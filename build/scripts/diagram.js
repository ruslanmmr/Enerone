"use strict";

var powerData = [29837, 28754, 28334, 28953, 29152];
var voltageData = [30488, 29311, 28682, 29725, 29666]; // обозначения данных графика по оси Х
// "\n" - используется для перевода строки и разбиения надписи на 2 и более строк
// перед текстом два раза стоит чтобы отступ от графика был

var DiaBottomLabels = ['01.02.2019', '02.02.2019', '03.02.2019', '04.02.2019', '05.02.2019']; // цвет текста левой оси обозначений графика

var fontColorLeftAxis = '#61B87C'; // цвет текста правой оси обозначений графика

var fontColorRightAxis = '#FAB216'; // конфигурация данных графика

var DiaGraphData = [{
  label: 'Генерация',
  backgroundColor: '#FAB216',
  borderColor: '#FAB216',
  fill: false,
  pointBackgroundColor: '#FAB216',
  pointBorderColor: '#FAB216',
  pointRadius: 0,
  pointHoverRadius: 8,
  yAxisID: 'y-axis-1',
  data: powerData
}, {
  label: 'Потребление',
  backgroundColor: '#61B87C',
  borderColor: '#61B87C',
  fill: false,
  pointBackgroundColor: '#61B87C',
  pointBorderColor: '#61B87C',
  pointRadius: 0,
  pointHoverRadius: 8,
  yAxisID: 'y-axis-2',
  data: voltageData
}];
$(document).ready(function (event) {
  $('.lc-diagram__element').each(function () {
    // конфигурация графика
    var dia_config = {
      type: 'line',
      data: {
        labels: DiaBottomLabels,
        datasets: DiaGraphData
      },
      options: {
        responsive: true,
        title: {
          display: false
        },
        legend: {
          display: false
        },
        elements: {
          line: {
            tension: 0.4
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 5,
            bottom: 5
          }
        },
        tooltips: {
          enabled: false,
          caretSize: 8,
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'index',
          intersect: false
        },
        lineOnHover: {
          enabled: true,
          lineColor: '#bbb',
          lineWidth: 1
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              drawBorder: true
            },
            ticks: {
              callback: function callback(value, index, values) {
                return value + '    ';
              },
              fontColor: fontColorLeftAxis
            },
            id: 'y-axis-1',
            display: true,
            position: 'left',
            type: 'linear'
          }, {
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              callback: function callback(value, index, values) {
                return '    ' + value;
              },
              fontColor: fontColorRightAxis
            },
            id: 'y-axis-2',
            display: true,
            position: 'right',
            type: 'linear'
          }]
        }
      }
    };
    var dia = this.getContext('2d');
    window.diagrammGraphic = new Chart(dia, dia_config);
    window.legendGraphic = window.diagrammGraphic.generateLegend();
  });
});
//# sourceMappingURL=maps/diagram.js.map
