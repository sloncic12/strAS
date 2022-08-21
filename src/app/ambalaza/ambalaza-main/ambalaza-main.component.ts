import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { NewUserDialogComponent } from 'src/app/dialogs/new-user-dialog/new-user-dialog.component';
import AmbalazaLoaner from '../../models/ambalazaloaner.model';
import { AmbalazaserviceService } from '../../services/ambalazaservice.service';

@Component({
  selector: 'app-ambalaza-main',
  templateUrl: './ambalaza-main.component.html',
  styleUrls: ['./ambalaza-main.component.css']
})
export class AmbalazaMainComponent implements OnInit {

  loaners: AmbalazaLoaner[];
  name = '';
  

  allLoaners:AmbalazaLoaner[];
  constructor(private ruter: Router,private ambalazaservice:AmbalazaserviceService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getLoaners();
  }

  getLoaners(): void{
  
    this.ambalazaservice.getAll().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>({
          key: c.payload, ...c.payload.val()
        })))
    ).subscribe(data => {
      this.loaners = data;
      this.allLoaners=data;
    });
  }

  goToDetails(student: any){
    localStorage.setItem("chosenBottleLoaner",JSON.stringify(student));
      
    this.ruter.navigate(['ambalaza/duznik']);

  }
  search(form:any):void{
    if(form.value.opis==""){
        
      this.getLoaners();
    }else{
      var text:string=form.value.opis;
    let scores: AmbalazaLoaner[] = [];
    this.allLoaners.forEach(l=>{
      var name:string=l.name!.toLocaleLowerCase();
      if (name.includes(text.toLocaleLowerCase()) || name==text.toLocaleLowerCase()){
    
        scores.push(l);
      }
    })
    
    if(scores.length>0)
  this.loaners=scores;
  }
}

goToDaily():any{

  
  this.ruter.navigate(['ambalaza/pregled']);
}


newLoaner(){

  const dialogRef = this.dialog.open(NewUserDialogComponent, {
    width: '250px',
    data: { toReturn: ""},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result==""){
      alert("Greska!");
      return;
    }
    var l=new AmbalazaLoaner();
    l.name=result;
    l.zaduzen="ne";
    l.id="";
    this.ambalazaservice.add(l);
  });
}





}
