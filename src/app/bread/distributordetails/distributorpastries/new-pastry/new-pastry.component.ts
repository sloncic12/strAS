import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import Distributor from 'src/app/models/distributors.model';
import Pastry from 'src/app/models/pastry.model';
import { PastryService } from 'src/app/services/pastry.service';


@Component({
  selector: 'app-new-pastry',
  templateUrl: './new-pastry.component.html',
  styleUrls: ['./new-pastry.component.css']
})
export class NewPastryComponent implements OnInit {

  @Output() someEvent = new EventEmitter<string>();
  constructor(private pastryService: PastryService, private fb: FormBuilder) { }

  myForm: Form;

  distributor: Distributor;
  ngOnInit(): void {

    this.distributor = JSON.parse(localStorage.getItem("chosenDistributor") || '{}');
  }

  submitCompany(form: any) {

    var d = new Pastry();
    d.name = form.value.naziv;
    d.cena = form.value.iznos;

    d.id = "";

    this.pastryService.addNewPastry(this.distributor.id!, d);
    this.someEvent.next("1");
  }
}
