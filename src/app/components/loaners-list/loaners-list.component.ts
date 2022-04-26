declare var require: any
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { NewUserDialogComponent } from 'src/app/dialogs/new-user-dialog/new-user-dialog.component';
import Loaners from 'src/app/models/loaners.model';
import { LoanersService } from 'src/app/services/loaners.service';

@Component(
  {
  selector: 'app-loaners-list',
  templateUrl: './loaners-list.component.html',
  styleUrls: ['./loaners-list.component.css']
})
export class LoanersListComponent implements OnInit {
 
  loaners: Loaners[];
  
  currentIndex = -1;
  allLoaners:Loaners[];
  name = '';
  opis:string;
  
  myForm:Form;
  constructor(private loanerService : LoanersService,private ruter: Router,private fb: FormBuilder,public dialog: MatDialog) { }

  ngOnInit(): void {


   this.getLoaners();
  }

    getLoaners(): void{
      this.loanerService.getAll().snapshotChanges().pipe(
        map(changes=>
          changes.map(c=>({
            key: c.payload, ...c.payload.val()
          })))
      ).subscribe(data => {
        this.loaners = data;
        this.allLoaners = data;
      });
    }

    goToLoaner(id:any):void{
      localStorage.setItem("chosenLoaner",JSON.stringify(id));
      
      this.ruter.navigate(['dug/duznik']);

    }

    goToDaily():any{
      this.ruter.navigate(['dug/pregled']);
    }

    search(form:any):any{
      
      if(form.value.opis==""){
        
        this.getLoaners();
      }else{
        var text:string=form.value.opis;
      let scores: Loaners[] = [];
      this.allLoaners.forEach(l=>{
        var name:string=l.name!.toLocaleLowerCase();
        if (name.includes(text.toLocaleLowerCase()) || name==text.toLocaleLowerCase()){
    
          scores.push(l);
        }
      })
      
      if(scores.length>0)
    this.loaners=scores;
    //   alert(  form.value.opis);
      
    //   if (form.value.opis!=""){
    //   this.loanerService.getByName(form.value.opis).snapshotChanges().pipe(
    //     map(changes=>
    //       changes.map(c=>({
    //         key: c.payload, ...c.payload.val()
    //       })))
    //   ).subscribe(data => {
        
      
    //     this.loaners = data;
    //     alert(this.loaners.length);
    //   });
    // }else{
    //   alert(  "oh no");
    //   this.getLoaners();
    
    // } 
    }
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
    var l=new Loaners();
    l.name=result;
    l.totalDebt=0;
    l.id="";
    this.loanerService.add(l);
  });
}
}
