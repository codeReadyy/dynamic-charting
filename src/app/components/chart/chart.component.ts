import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  private chart_options:any = {};
  constructor(
    private chart$: ChartService,
    private data$: DataService
  ) { }

  ngOnInit() {
    this.chart_options['id'] = 'live_chart';
    this.chart$.live_chart(this.chart_options);
  }

  ngOnDestroy() {
    if(navigator.onLine)
      this.data$.unsubscribe();
  }
}
