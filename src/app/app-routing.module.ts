import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { OhlcgridComponent } from './components/ohlcgrid/ohlcgrid.component';
import { UserSearchComponent } from './components/user-search/user-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'grid', component: OhlcgridComponent },
  { path: 'users', component: UserSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
