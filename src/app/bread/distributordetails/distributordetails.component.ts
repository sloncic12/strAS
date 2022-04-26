import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';

import Distributor from 'src/app/models/distributors.model';
import { PastryService } from 'src/app/services/pastry.service';
import { NewPastryComponent } from './distributorpastries/new-pastry/new-pastry.component';

@Component({
  selector: 'app-distributordetails',
  templateUrl: './distributordetails.component.html',
  styleUrls: ['./distributordetails.component.css']
})
export class DistributordetailsComponent implements OnInit {
  selected:number;

  @ViewChild(NewPastryComponent) child:NewPastryComponent;
  setSelected(n:any){
    this.selected=n;
    localStorage.setItem("selected",n);
  }
  constructor(private pastryService:PastryService) { }
  distributor: Distributor;
  ngOnInit(): void {
    this.selected=0;
    this.distributor= JSON.parse( localStorage.getItem("chosenDistributor") || '{}');
    
  }



}
