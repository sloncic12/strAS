import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Bread from '../models/bread.model';

@Injectable({
  providedIn: 'root'
})
export class BreadService {


  private dbPath = '/glu_bread';

  loanersRef: AngularFireList<Bread>;

  constructor(private db:AngularFireDatabase) { 

    this.loanersRef=db.list(this.dbPath);
   
  }
   getAllInsideDates(date1:number,date2:number) :AngularFireList<Bread>{
  
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return  this.db.list('/mp_bread', ref => ref.orderByChild('datum').startAt(date2).endAt(date1));
    }else{
      
    return  this.db.list('/glu_bread', ref => ref.orderByChild('datum').startAt(date2).endAt(date1));
    }   


   } 
  getAll(): AngularFireList<Bread> {
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return  this.db.list('/mp_bread', ref => ref.orderByChild('datum'));
    }else{
      
    return  this.db.list('/glu_bread', ref => ref.orderByChild('datum'));
    }    
  }

  getAllReturned(): AngularFireList<Bread> {
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return  this.db.list('/mp_bread_returned', ref => ref.orderByChild('datum'));}
    else{
      
    return  this.db.list('/glu_bread_returned', ref => ref.orderByChild('datum'));
    }
  }
  update(key: string, value: any): Promise<void> {
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return this.db.list('mp_bread').update(key, value);
    }else{
      return this.db.list('glu_bread').update(key, value);
    }
  }

  addReturned(bread: Bread): any {
    var newId= this.db.createPushId();
    bread.id=newId;
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return this.db.list('/mp_bread_returned', ref => ref.push(bread));
    }else{
      
    return this.db.list('/glu_bread_returned', ref => ref.push(bread));
    }
  }

  addNewBread(bread: Bread): any {
    
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    var someRef=this.db.database.ref().child('mp_bread').push();
    var newId=someRef.key;
    bread.id=newId;
    return someRef.set(bread);
    }else{
      var someRef=this.db.database.ref().child('glu_bread').push();
    var newId=someRef.key;
    bread.id=newId;
    return someRef.set(bread);
    }

 
     
    
   
  }

  delete(key: string): Promise<void> {
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return this.db.list('mp_bread').remove(key);
    }else{
      return this.db.list('glu_bread').remove(key);
    }
  }

  
}
