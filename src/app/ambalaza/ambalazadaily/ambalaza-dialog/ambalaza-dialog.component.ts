import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Ambalaza from 'src/app/models/ambalaza.model';
import { AmbalazaDetailService } from 'src/app/services/ambalaza-detail.service';

@Component({
  selector: 'app-ambalaza-dialog',
  templateUrl: './ambalaza-dialog.component.html',
  styleUrls: ['./ambalaza-dialog.component.css']
})
export class AmbalazaDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,private bottleService: AmbalazaDetailService,private ruter:Router) { }
  date1:Date;
  
  myForm:Form;
  ambalazavraceno:Ambalaza[]=[];
  
  date2:Date;
  ambalaza:Ambalaza[]=[];
   beers:Array<string> = ["Lav",
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
  }

  dateChangedOne($event:any){
    this.date1= $event.target.value;
   }

   dateChangedTwo($event:any){
     this.date2= $event.target.value;
    }

    async  hello() :Promise<Ambalaza[]>{
      return await   this.bottleService.getChildren();
    };
  
    
 async submitCompany(form:any){
  // if (this.date1==null||this.date2==null){
  //   alert("Pogresno popunjeno")
  //   return;
  // }
  this.ambalaza=[];
  this.ambalazavraceno=[];
 let gajbe: number[] = 
 [0,0,0,0,0,0,0,
  0,0,0,0,0,
  0,0,0,0];
  let flase: number[] = 
  [0,0,0,0,0,0,0,
   0,0,0,0,0,
   0,0,0,0];
   let vracenogajbe: number[] = 
   [0,0,0,0,0,0,0,
    0,0,0,0,0,
    0,0,0,0];
    let vracenoflase: number[] = 
    [0,0,0,0,0,0,0,
     0,0,0,0,0,
     0,0,0,0];
   this.date1.setSeconds(0);
   this.date1.setMinutes(0);
   this.date1.setHours(0);
   var dateTo=this.date1.getTime()*(-1);
   this.date2.setSeconds(0);
   this.date2.setMinutes(0);
   this.date2.setHours(0);
   var dateFrom=this.date2.getTime()*(-1);
   let  p:Ambalaza[]|void= await this.hello().catch(error => console.error(error))
  if (p!=null){
    p.forEach(debt=>{
      if ((debt.date! <= dateTo) && (debt.date! >= dateFrom)) {
        var pos=this.beers.indexOf(debt.tip!);
        if (debt.returned == "ne") {
          gajbe[pos] += debt.gajba!;
          flase[pos] += debt.flase!;
        } else {
          vracenogajbe[pos] += debt.gajba!;
          vracenoflase[pos] += debt.flase!;
            
        }
      }
    })
    for(var i=0;i<this.beers.length;i++){
      if (gajbe[i]!=0 ||flase[i]!=0){
          var b=new Ambalaza();
          b.gajba=gajbe[i];
          b.flase=flase[i];
          b.tip=this.beers[i];
          this.ambalaza.push(b);
      }
    
      if (vracenogajbe[i]!=0 ||vracenoflase[i]!=0){
        var b=new Ambalaza();
        b.gajba=vracenogajbe[i];
        b.flase=vracenoflase[i];
        b.tip=this.beers[i];
        this.ambalazavraceno.push(b);
    }
  }
}
    //this.ambalaza.forEach(a=>{
     
  //  })
    
}


}
