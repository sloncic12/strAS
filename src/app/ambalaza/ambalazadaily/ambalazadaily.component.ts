import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { BaseRouteReuseStrategy, Router, RouteReuseStrategy } from '@angular/router';
import { map } from 'rxjs';
import Ambalaza from 'src/app/models/ambalaza.model';
import { AmbalazaDetailService } from 'src/app/services/ambalaza-detail.service';
import { AmbalazaserviceService } from 'src/app/services/ambalazaservice.service';

@Component({
  selector: 'app-ambalazadaily',
  templateUrl: './ambalazadaily.component.html',
  styleUrls: ['./ambalazadaily.component.css']
})
export class AmbalazadailyComponent implements OnInit {

  constructor(private fb: FormBuilder, private bottleService: AmbalazaDetailService, private ruter: Router) { }

  ambalazavraceno: Ambalaza[] = [];

  ambalazasums: Ambalaza[] = [];
  date2: Date;
  ambalaza: Ambalaza[] = [];
  beers: Array<string> = ["Lav",
    'Jelen 0,33l',
    'Jelen 0,5l',
    "Zajecarsko 0,5l",
    "Zajecarsko 0,33l",
    "Tuborg",
    "Heineken",
    "Apatinsko",
    "Merak",
    "Nektar 0,5l",

    "Banjalucko",
    "Kisela voda 0,25l",
    "Niksicko",
    "Kisela voda 1l",
    "Carlsberg",
    "Staropramen"];
  ngOnInit(): void {
    this.getSum();
  }


  async hello2(databaseName: string): Promise<Ambalaza[]> {
    return await this.bottleService.getChildrenForSum(databaseName);
  };

  async getSum() {
    this.ambalazavraceno = [];
    this.ambalazasums = [];
    this.ambalaza = [];
    let gajbe: number[] =
      [0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0];
    let flase: number[] =
      [0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0];
    let p: Ambalaza[] | void = await this.hello2("mp_bottles").catch(error => console.error(error))

    if (p != null) {
      p.forEach(debt => {

        var pos = this.beers.indexOf(debt.tip!);

        gajbe[pos] += debt.gajba!;
        flase[pos] += debt.flase!;


      })
    }
    let p2: Ambalaza[] | void = await this.hello2("glu_bottles").catch(error => console.error(error))

    if (p2 != null) {
      p2.forEach(debt => {
        var pos = this.beers.indexOf(debt.tip!);
        gajbe[pos] += debt.gajba!;
        flase[pos] += debt.flase!;


      })
    }
    for (var i = 0; i < this.beers.length; i++) {
      if (gajbe[i] != 0 || flase[i] != 0) {
        var b = new Ambalaza();
        b.gajba = gajbe[i];
        b.flase = flase[i];
        b.tip = this.beers[i];
        this.ambalazasums.push(b);
      }
    }
  }



  goToDetails(beerType: Ambalaza) {
    localStorage.setItem("selectedBeer", beerType.tip!);
    this.ruter.navigate(['ambalaza/pregled/vrsta']);
  }

  goToDatesCheck() {

    this.ruter.navigate(['ambalaza/pregled/dnevni']);
  }

}
