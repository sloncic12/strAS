import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import AmbalazaLoaner from '../models/ambalazaloaner.model';

@Injectable({
  providedIn: 'root'
})
export class AmbalazaserviceService {
  private dbPath = '/mp_bottleloaners';

  loanersRef: AngularFireList<AmbalazaLoaner>;
  
  constructor(private db:AngularFireDatabase) {
    
  
   }


   getAll(): AngularFireList<AmbalazaLoaner> {
     
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){ 
    return this.db.list('/mp_bottleloaners', ref => ref.orderByChild("zaduzen"));
    }
    else{
    return this.db.list('/glu_bottleloaners', ref => ref.orderByChild("zaduzen"));
    }
  }

  update(key: string, value: any): Promise<void> {
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
     
      return this.db.list('/mp_bottleloaners').update(key,value);
    }else{
      return this.db.list('/glu_bottleloaners').update(key,value);
    
    }
  }

  add(loaner: AmbalazaLoaner): any {
    
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    
      var someRef=this.db.database.ref().child('mp_bottleloaners').push();
      var newId=someRef.key;
      loaner.id=newId;
    return someRef.set(loaner);
    }else{
      var someRef=this.db.database.ref().child('glu_bottleloaners').push();
    
      var newId=someRef.key;
      loaner.id=newId;
      return someRef.set(loaner);
    }
  }
}
