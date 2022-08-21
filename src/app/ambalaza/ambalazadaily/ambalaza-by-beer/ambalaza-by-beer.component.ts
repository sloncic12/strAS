import { getLocaleNumberFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import Ambalaza from 'src/app/models/ambalaza.model';
import { AmbalazaDetailService } from 'src/app/services/ambalaza-detail.service';

@Component({
  selector: 'app-ambalaza-by-beer',
  templateUrl: './ambalaza-by-beer.component.html',
  styleUrls: ['./ambalaza-by-beer.component.css']
})
export class AmbalazaByBeerComponent implements OnInit {

  constructor(private bottleService: AmbalazaDetailService) { }
  beerType: string;
  ambalaza: Ambalaza[] = [];
  ambalazaglusci: Ambalaza[] = [];
  ngOnInit(): void {

    this.beerType = localStorage.getItem("selectedBeer")!;

    this.getTheData();
    this.getTheDataGlusci();
  }
  async hello2(databaseName: string): Promise<Ambalaza[]> {
    return await this.bottleService.getBeerLoaners(databaseName, this.beerType);
  };



  async getTheData() {
    let p: Ambalaza[] | void = await this.hello2("mp_bottles").catch(error => console.error(error))

    this.ambalaza = p!;
  }




  async getTheDataGlusci() {
    let p: Ambalaza[] | void = await this.hello2("glu_bottles").catch(error => console.error(error))

    this.ambalazaglusci = p!;
  }
}
