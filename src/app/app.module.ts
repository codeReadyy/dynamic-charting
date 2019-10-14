import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { OhlcgridComponent } from './components/ohlcgrid/ohlcgrid.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { OhlcService } from './services/ohlc.service';
import { ChartService } from './services/chart.service';
import { DataService } from './services/data.service';
import { SearchPipe } from './filters/search.pipe';
import { SortPipe } from './filters/sort.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ChartComponent,
    OhlcgridComponent,
    UserSearchComponent,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [OhlcService, ChartService, DataService],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
