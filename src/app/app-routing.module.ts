import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbalazaDetailsComponent } from './ambalaza/ambalaza-details/ambalaza-details.component';
import { AmbalazaMainComponent } from './ambalaza/ambalaza-main/ambalaza-main.component';
import { AmbalazaByBeerComponent } from './ambalaza/ambalazadaily/ambalaza-by-beer/ambalaza-by-beer.component';
import { AmbalazaDialogComponent } from './ambalaza/ambalazadaily/ambalaza-dialog/ambalaza-dialog.component';
import { AmbalazadailyComponent } from './ambalaza/ambalazadaily/ambalazadaily.component';
import { BreadListComponent } from './bread/bread-list/bread-list.component';
import { BreadNewComponent } from './bread/bread-new/bread-new.component';
import { BreadReturnedComponent } from './bread/bread-returned/bread-returned.component';
import { DistributordetailsComponent } from './bread/distributordetails/distributordetails.component';
import { DistributorsComponent } from './bread/distributors/distributors.component';
import { DailyDebtComponent } from './components/daily-debt/daily-debt.component';
import { LoanerdetailsComponent } from './components/loanerdetails/loanerdetails.component';
import { LoanersListComponent } from './components/loaners-list/loaners-list.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';



const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'dug',component: LoanersListComponent},
  {path: 'ambalaza',component: AmbalazaMainComponent},
  {path: 'dug/duznik',component: LoanerdetailsComponent},
  {path: 'ambalaza/duznik',component: AmbalazaDetailsComponent},
  {path: 'distributeri',component: DistributorsComponent},
  {path: 'distributeri/pregled',component: DistributordetailsComponent},
  {path: 'dug/pregled',component: DailyDebtComponent},
  {path: 'hleb',component: BreadListComponent},
  {path: 'hleb/vracen',component: BreadReturnedComponent},
  {path: 'hleb/nov',component: BreadNewComponent},
  {path: 'ambalaza/pregled/dnevni',component: AmbalazaDialogComponent},
  {path: 'ambalaza/pregled',component: AmbalazadailyComponent},
  {path: 'proizvodi',component: ProductsComponent},
  
  {path: 'ambalaza/pregled/vrsta',component: AmbalazaByBeerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }