import { Component, OnInit } from '@angular/core';
import { OhlcService } from '../../services/ohlc.service';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public chart_options = {};
  constructor(
    private ohlc$: OhlcService,
    private chart$:ChartService
  ) { }

  ngOnInit() {
    if(navigator.onLine){
      this.ohlc$.get_historical_data().subscribe(data => {
        var volume = []
        this.chart_options['ohlc'] = data
          .map(n => n.split(',').map((num) => parseFloat(num))).sort((a, b) => a[0] - b[0]);
        this.chart_options['ohlc'].forEach((item) => {
          volume.push([item[0],item[5]]);
        });
        this.chart_options['volume'] = volume;
        this.chart_options['id'] = 'historical_chart';
        localStorage.setItem("histo_data", JSON.stringify(this.chart_options));
        this.chart$.historical_chart(this.chart_options);
      });
    }
    else{
      this.chart$.historical_chart(JSON.parse(localStorage.getItem("histo_data")));
    }
    
  }

}
