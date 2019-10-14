import { Injectable } from '@angular/core';
import { DataService } from './data.service';
declare var Highcharts : any;

@Injectable()
export class ChartService {
  
  constructor(
    private dataService$: DataService,
  ) { }

  public historical_chart(options) {
    var groupingUnits = [
          ['day',[1]],['week',[1]], ['month',[1, 2, 3, 4, 6]]
      ];

      Highcharts.stockChart(options.id, {
          rangeSelector: {
              selected: 1
          },
          title: {
              text: 'Historical Chart'
          },
          exporting: {
            enabled: false
          },
          yAxis: [
            {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'OHLC'
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                  enabled: true
              }
          }, 
          {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'Volume'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
          }],
  
          tooltip: {
              split: true
          },
  
          series: [
            {
              type: 'ohlc',
              name: 'OHLC',
              data: options.ohlc,
              dataGrouping: {
                  units: groupingUnits
              }
          },
          {
              type: 'column',
              name: 'Volume',
              data: options.volume,
              yAxis: 1,
              dataGrouping: {
                  forced: true,
                  units: groupingUnits
              }
          }
        ]
      });
  };

  public live_chart(options) {
    var storage_ohlc_data:any = [];
    var storage_volume_data:any = [];
    // navigator.onLine will only work for chrome
    var offline_ohlc_data:any = navigator.onLine ? [0] : JSON.parse(localStorage.getItem("ohlc"));
    var offline_volume_data:any = navigator.onLine ? [0] : JSON.parse(localStorage.getItem("volume"));
    var that = this;
    var groupingUnits = [
        ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
        ['second',[1, 2, 5, 10, 15, 30]],
        ['minute',[1, 2, 5, 10, 15, 30]],
        ['day',[1]]
        ]; 
      Highcharts.stockChart(options.id, {
        chart: {
          events: {
                load: function () {
                    if(navigator.onLine){
                        var firstSeries = this.series[0];
                        var secondSeries = this.series[1];
                        that.dataService$.getOHLCData(false)
                        .subscribe(data => {
                            var ohlcArray = data.split(",").map((num)=>parseFloat(num));
                            let singleohlcItem:Array<number> = [ohlcArray[0],ohlcArray[1],ohlcArray[2],ohlcArray[3],ohlcArray[4]]
                            storage_ohlc_data.push(singleohlcItem);
                            firstSeries.addPoint(singleohlcItem, true, false);
                            localStorage.setItem("ohlc", JSON.stringify(storage_ohlc_data));
                            let singlevolumeItem:Array<number> = [ohlcArray[0],ohlcArray[5]];
                            storage_volume_data.push(singlevolumeItem);
                            secondSeries.addPoint([ohlcArray[0],ohlcArray[5]], true, false);
                            localStorage.setItem("volume", JSON.stringify(storage_volume_data));
                        });
                    }
                }
            }
        },
          rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1min'
            },
            {
                count: 3,
                type: 'minute',
                text: '3min'
            }, {
                count: 5,
                type: 'minute',
                text: '5min'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 3
          },
          exporting: {
            enabled: false
          },
          title: {
              text: 'Live Chart'
          },
  
          yAxis: [
            {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'OHLC'
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                  enabled: true
              }
          }, 
          {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'Volume'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
          }],
  
          tooltip: {
              split: true
          },
  
          series: [
            {
              type: 'ohlc',
              name: 'OHLC',
              data: offline_ohlc_data,
              dataGrouping: {
                  units: groupingUnits
              }
          },
          {
              type: 'column',
              name: 'Volume',
              data: offline_volume_data,
              yAxis: 1,
              dataGrouping: {
                  units: groupingUnits
              }
          }
        ]
      });
  }

}
