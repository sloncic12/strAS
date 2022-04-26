import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import Distributor from 'src/app/models/distributors.model';
import FlourDebt from 'src/app/models/flourdebt.model';
import { DistributorsService } from 'src/app/services/distributors.service';
import { FlourdebtService } from 'src/app/services/flourdebt.service';
import { PastryService } from 'src/app/services/pastry.service';

@Component({
  selector: 'app-new-flour-debt',
  templateUrl: './new-flour-debt.component.html',
  styleUrls: ['./new-flour-debt.component.css']
})
export class NewFlourDebtComponent implements OnInit {

  opis:string;
  iznos:number;
  picker: any ;

  selectedRadio:string;
  myForm:Form;
  date:Date;
  breadPrice:number| undefined;
  distributor: Distributor;
  constructor(private fb: FormBuilder,private distributorService:DistributorsService,private flourDebtService:FlourdebtService,private pastryService:PastryService) { }
 
  ngOnInit(): void {
    
    this.selectedRadio="1";
   this.distributor= JSON.parse( localStorage.getItem("chosenDistributor") || '{}');
   this.getBreadPrice()
  }

  getBreadPrice(): void{
    this.pastryService.getBreadPrice(this.distributor.id!).valueChanges().subscribe(el=>{
     this.breadPrice= el?.cena
    })
  }
  submitCompany(form:any){
 

    if (form.value.cedulja==0 && form.value.iznos==0){
      alert("Lose popunjeno");
      return;
    }

    
    var  d=new FlourDebt();
    if (form.value.cedulja!=0){
    d.cedulja=form.value.cedulja;
      
    }else{
      d.cedulja=0;
    }

    if (form.value.iznos!=0){
    
    d.value=form.value.iznos;
     
  }else{
        d.value=0;
      }

      if (this.selectedRadio!="1"){
        d.cedulja=d.cedulja!*(-1); 
        d.value=d.value!*(-1); 
       }
    this.date.setSeconds(0);
    this.date.setMinutes(0);
    this.date.setHours(0);
    
    d.id="";
    d.date=this.date.getTime()*(-1);

   
    const data = {
      cedulja: d.cedulja!+this.distributor.cedulja!,
      cena: d.value!/this.breadPrice!+this.distributor.cena!
    };

    var newValue= this.distributor.cena!-form.value.iznos;

  
       this.flourDebtService.add(d,this.distributor.id);
     this.distributorService.update(this.distributor.id!,data)
     .then(() => {
      this.distributor.cena= d.value!/this.breadPrice!+this.distributor.cena!;
      
      this.distributor.cedulja= d.cedulja!+this.distributor.cedulja!;
      localStorage.setItem("chosenDistributor",JSON.stringify(this.distributor));
      window.location.reload();
      alert("Uspesno dodato!"); form.reset()})
     .catch(err => console.log(err));
     
    }

    dateChanged($event:any){
     this.date= $event.target.value;
    }
  }



