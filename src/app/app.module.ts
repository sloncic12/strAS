import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoanersListComponent } from './components/loaners-list/loaners-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from  '@angular/fire/compat/auth';
import { AmbalazaMainComponent } from './ambalaza/ambalaza-main/ambalaza-main.component';
import { LoanerdetailsComponent } from './components/loanerdetails/loanerdetails.component';
import { AmbalazaDetailsComponent } from './ambalaza/ambalaza-details/ambalaza-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DistributorsComponent } from './bread/distributors/distributors.component';
import { DistributordetailsComponent } from './bread/distributordetails/distributordetails.component';
import { DistributorpastriesComponent } from './bread/distributordetails/distributorpastries/distributorpastries.component';
import { DistributordebtsComponent } from './bread/distributordetails/distributordebts/distributordebts.component';
import { DistributorbreadreviewComponent } from './bread/distributordetails/distributorbreadreview/distributorbreadreview.component';
import { NewDebtComponent } from './components/loanerdetails/new-debt/new-debt.component';
import { ReviewDebtsComponent } from './components/loanerdetails/review-debts/review-debts.component'
import { ReturnDebtComponent } from './components/loanerdetails/return-debt/return-debt.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DailyDebtComponent } from './components/daily-debt/daily-debt.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogPriceChangeComponent } from './bread/distributordetails/distributorpastries/dialog-price-change/dialog-price-change.component';
import { NewFlourDebtComponent } from './bread/distributordetails/new-flour-debt/new-flour-debt.component';
import { BreadListComponent } from './bread/bread-list/bread-list.component';
import { ReturnBreadDialogComponent } from './bread/bread-list/return-bread-dialog/return-bread-dialog.component';
import { BreadNewComponent } from './bread/bread-new/bread-new.component';
import {MatSelectModule} from '@angular/material/select';
import { BreadReturnedComponent } from './bread/bread-returned/bread-returned.component';
import { AmbalazadailyComponent } from './ambalaza/ambalazadaily/ambalazadaily.component';
import { AmbalazaReviewComponent } from './ambalaza/ambalaza-details/ambalaza-review/ambalaza-review.component';
import { AmbalazaNewComponent } from './ambalaza/ambalaza-details/ambalaza-new/ambalaza-new.component';
import { AmbalazaReturnComponent } from './ambalaza/ambalaza-details/ambalaza-return/ambalaza-return.component';
import { AmbalazaDialogComponent } from './ambalaza/ambalazadaily/ambalaza-dialog/ambalaza-dialog.component';
import { NewPastryComponent } from './bread/distributordetails/distributorpastries/new-pastry/new-pastry.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NewUserDialogComponent } from './dialogs/new-user-dialog/new-user-dialog.component';
import{ init } from 'emailjs-com';
init("user_YG2iPBF6kuSMPaBnriHhu");
import { HttpClientModule } from '@angular/common/http';
import { AmbalazaByBeerComponent } from './ambalaza/ambalazadaily/ambalaza-by-beer/ambalaza-by-beer.component';
import { ProductsComponent } from './products/products.component';
@NgModule({
  declarations: [
    AppComponent,
    LoanersListComponent,
    LoginComponent,
    AmbalazaMainComponent,
    LoanerdetailsComponent,
    AmbalazaDetailsComponent,
    DistributorsComponent,
    DistributordetailsComponent,
    DistributorpastriesComponent,
    DistributordebtsComponent,
    DistributorbreadreviewComponent,
    NewDebtComponent,
    
    ReviewDebtsComponent,
    ReturnDebtComponent,
    DailyDebtComponent,
    DialogPriceChangeComponent,
    NewFlourDebtComponent,
    BreadListComponent,
    ReturnBreadDialogComponent,
    BreadNewComponent,
    BreadReturnedComponent,
    AmbalazadailyComponent,
    AmbalazaReviewComponent,
    AmbalazaNewComponent,
    AmbalazaReturnComponent,
    AmbalazaDialogComponent,
    NewPastryComponent,
    NewUserDialogComponent,
    AmbalazaByBeerComponent,
    ProductsComponent

  ],
  imports: [
    BrowserModule,
  
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    MatFormFieldModule ,
    AngularFireAuthModule,
    MatInputModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    NgbModule,
    MaterialModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
