import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import Ambalaza from 'src/app/models/ambalaza.model';
import AmbalazaLoaner from 'src/app/models/ambalazaloaner.model';
import { AmbalazaDetailService } from 'src/app/services/ambalaza-detail.service';
import { AmbalazaserviceService } from 'src/app/services/ambalazaservice.service';

@Component({
  selector: 'app-ambalaza-new',
  templateUrl: './ambalaza-new.component.html',
  styleUrls: ['./ambalaza-new.component.css']
})
export class AmbalazaNewComponent implements OnInit {

  loaner: AmbalazaLoaner;
  constructor(private mainService: AmbalazaDetailService, private fb: FormBuilder, private loanerService: AmbalazaserviceService) { }
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
  selectedBeerType: string;

  myForm: Form;
  date: Date;

  ngOnInit(): void {

    this.loaner = JSON.parse(localStorage.getItem("chosenBottleLoaner") || '{}');
  }



  dateChanged($event: any) {
    this.date = $event.target.value;
  }


  submitCompany(form: any) {

    this.date.setSeconds(0);
    this.date.setMinutes(0);
    this.date.setHours(0);

    var ambalaza = new Ambalaza();
    ambalaza.id = "";
    ambalaza.gajba = form.value.gajbe;
    ambalaza.flase = form.value.flase;
    ambalaza.date = this.date.getTime() * (-1);
    ambalaza.tip = this.selectedBeerType!;
    ambalaza.returned = "ne";
    var b = this.mainService.addNewAmbalaza(this.loaner.id!, ambalaza);
    if (b) {
      this.loanerService.update(this.loaner.id!, { zaduzen: "da" })
    }
    alert("Uspesno dodato!");
    window.location.reload();
  }
}
