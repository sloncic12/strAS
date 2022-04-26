import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Ambalaza from '../../models/ambalaza.model';
import AmbalazaLoaner from '../../models/ambalazaloaner.model';
import { AmbalazaDetailService } from '../../services/ambalaza-detail.service';

@Component({
  selector: 'app-ambalaza-details',
  templateUrl: './ambalaza-details.component.html',
  styleUrls: ['./ambalaza-details.component.css']
})
export class AmbalazaDetailsComponent implements OnInit {

  constructor() { }

  loaner: AmbalazaLoaner;
  selected:number;
  ngOnInit(): void {
    this.loaner= JSON.parse( localStorage.getItem("chosenBottleLoaner") || '{}');
  this.selected=0;
  
  }
 
  setSelected(n:any){
    this.selected=n;
    localStorage.setItem("selected",n);
  }
  




}
