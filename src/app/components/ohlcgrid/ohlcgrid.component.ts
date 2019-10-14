import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { OHLCEntity } from '../../models/ohlcentity';

@Component({
  selector: 'app-ohlcgrid',
  templateUrl: './ohlcgrid.component.html',
  styleUrls: ['./ohlcgrid.component.scss']
})
export class OhlcgridComponent implements OnInit {
  private subscription: Subscription;
  public gridData: OHLCEntity[] = [];
  public path:string = "";
  public order:any;
  public open_sort:number;
  public high_sort:number;
  public low_sort:number;
  public close_sort:number;
  public volume_sort:number;
  public time_sort:number;
  public scrolled:string = 'bottom';

  constructor(
    private dataService$: DataService
  ) { 
    this.initialize_sort();
  }

  private initialize_sort(){
    this.time_sort = 0 ;
    this.close_sort = 0 ; 
    this.low_sort= 0 ; 
    this.high_sort = 0 ; 
    this.volume_sort = 0 ; 
    this.open_sort = 0 ; 
  }
  
  ngOnInit() {
    this.get_grid_data();
  }

  public sort(path){
    if(path==='Open'){
      this.open_sort = this.open_sort === -1 ? 1: -1;
      this.order = this.open_sort;
      this.initialize_sort();
      this.open_sort = this.order;
    }
    else if(path==='High'){
      this.high_sort = this.high_sort === -1 ? 1: -1;
      this.order = this.high_sort;
      this.initialize_sort();
      this.high_sort = this.order;
    }
    else if(path==='Low'){
      this.low_sort = this.low_sort === -1 ? 1: -1;
      this.order = this.low_sort;
      this.initialize_sort();
      this.low_sort = this.order;
    }
    else if(path==='Close'){
      this.close_sort = this.close_sort === -1 ? 1: -1;
      this.order = this.close_sort;
      this.initialize_sort();
      this.close_sort = this.order;
    }
    else if(path==='Volume'){
      this.volume_sort = this.volume_sort === -1 ? 1: -1;
      this.order = this.volume_sort;
      this.initialize_sort();
      this.volume_sort = this.order;
    }
    else if(path==='Time'){
      this.time_sort= this.time_sort === -1 ? 1: -1;
      this.order = this.time_sort;
      this.initialize_sort();
      this.time_sort = this.order;
    }
    this.path = path;
  }

  private get_grid_data(){
    if(!navigator.onLine){
      this.gridData = JSON.parse(localStorage.getItem("ohlcgrid"));
    }
    else{
      this.subscription = this.dataService$.getOHLCData(true).subscribe(response=>{
        var ohlcArray = response.split(",").map((num)=>parseFloat(num));
        var data:OHLCEntity = {} as OHLCEntity ;
        data.Time = this.timeConverter(parseFloat(ohlcArray[0])); 
        data.Open = ohlcArray[1];
        data.High = ohlcArray[2]
        data.Low = ohlcArray[3]
        data.Close = ohlcArray[4]
        data.Volume = ohlcArray[5]         
        this.gridData.push(data);
        this.scrollBottom();
        localStorage.setItem("ohlcgrid", JSON.stringify(this.gridData));
      },()=>{
        console.log("Error in observing")
      });  
    }
  }

  private timeConverter(timestamp):string{
    var a = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  private scrollBottom(){
    var grid_element = document.querySelector('#data-list');
    if(this.scrolled==='bottom')
      grid_element.scrollTop = grid_element.scrollHeight;  
    else if(this.scrolled==='top')
      grid_element.scrollTop = 0;
  }

  ngOnDestroy(){
    if(navigator.onLine)
    {
      this.dataService$.unsubscribe();
      this.subscription.unsubscribe();
    }
    
  }

}
