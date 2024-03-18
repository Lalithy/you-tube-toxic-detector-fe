import {Component, Inject, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {ToxicService} from "../../Services/toxic.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.component.html',
  styleUrls: ['./information-page.component.scss']
})
export class InformationPageComponent implements OnInit {
  HighCharts = Highcharts;
  pieChart: any;
  chartListObj: any;
  videoId: string = '';

  constructor(private toxicService: ToxicService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  //  this.pieChart = this.generatePieChart();
    this.videoId = data.videoId;
  }

  ngOnInit(){
  //  this.videoId = localStorage.getItem('videoId') ?? '';
    console.log('Dialog DATA', this.data.videoId);
    this.fetchPieChart(this.videoId);
  }

  async fetchPieChart(videoId: string) {
    try {
      this.chartListObj = await this.getYtFalseInformation(videoId);
      console.log('False Information: ',this.chartListObj);
      this.pieChart = this.generatePieChart(this.chartListObj);

    } catch (error) {
      console.error(error);
    }
  }

  async getYtFalseInformation(videoId: string) {
    return new Promise((resolve, reject) => {
      this.toxicService
        .getFalseInformation(videoId)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  generatePieChart(chartData: any) {

    if (!chartData) {
      return {};
    }

    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Verify Information Accuracy',
        align: 'center',
        style: {
          textDecoration: 'underline'
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
              '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
            connectorColor: 'rgba(128,128,128,0.5)'
          }
        }
      },
      series: [{
        name: 'Sentiment',
        data: [
          { name: 'Positive', y: chartData.positive },
          { name: 'Negative', y: chartData.negative },
          { name: 'Neutral', y: chartData.neutral }
        ]
      }]
    };
  }

}
