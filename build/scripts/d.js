"use strict";

var ctx = document.querySelector('.lc-diagram__element');
var data1 = [29837, 28754, 28334, 28953, 29152],
    data2 = [30488, 29311, 28682, 29725, 29666],
    labels = ['01.02.2019', '02.02.2019', '03.02.2019', '04.02.2019', '05.02.2019'];
var data = [{
  label: 'Генерация',
  backgroundColor: '#FAB216',
  borderColor: '#FAB216',
  fill: false,
  pointBackgroundColor: '#FAB216',
  pointBorderColor: '#FAB216',
  pointRadius: 6,
  pointHoverRadius: 8,
  data: data1
}, {
  label: 'Потребление',
  backgroundColor: '#61B87C',
  borderColor: '#61B87C',
  fill: false,
  pointBackgroundColor: '#61B87C',
  pointBorderColor: '#61B87C',
  pointRadius: 6,
  pointHoverRadius: 8,
  data: data2
}];
var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: data
  }
});
//# sourceMappingURL=maps/d.js.map
