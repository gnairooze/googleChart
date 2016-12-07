window.onload = function (){
  google.charts.load("current", {packages:["timeline"]});
  google.charts.setOnLoadCallback(drawChart);
}; 
  
function drawChart() {

  var container = document.getElementById('timelinesContainer');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'string', id: 'Name' });
  dataTable.addColumn({ type: 'string', id: 'Task' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows(tasksData);

  var options = {
    timeline: { 
      groupByRowLabel: true,
      colorByRowLabel: true
    }
  }

  chart.draw(dataTable, options);

  syncSizeInputs();
}