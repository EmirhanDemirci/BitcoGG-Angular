import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../JS/canvasjs.min';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  // Creating a Container (Hardcoded, no time left to render it with real data)
  ngOnInit(): void {
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      axisY: {
        includeZero: false
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: [{
          y: 450
        },
        {
          y: 414
        },
        {
          y: 520,
          indexLabel: "\u2191 highest",
          markerColor: "red",
          markerType: "triangle"
        },
        {
          y: 460
        },
        {
          y: 450
        },
        {
          y: 500
        },
        {
          y: 480
        },
        {
          y: 480
        },
        {
          y: 410,
          indexLabel: "\u2193 lowest",
          markerColor: "DarkSlateGrey",
          markerType: "cross"
        },
        {
          y: 500
        },
        {
          y: 480
        },
        {
          y: 510
        }
        ]
      }]
    });
    chart.render();
  }

}
