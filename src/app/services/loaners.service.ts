import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import Loaners from '../models/loaners.model';

@Injectable({
  providedIn: 'root'
})
export class LoanersService {

  private dbPath = '/glu_loaners';

  loanersRef: AngularFireList<Loaners>;

  constructor(private db:AngularFireDatabase) { 

  
  }

  
  getAll(): AngularFireList<Loaners> {

    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return this.db.list('/mp_loaners', ref => ref.orderByChild("name"));
    }else{
      return this.db.list('/glu_loaners', ref => ref.orderByChild("name"));
   
    }
  }

  update(key: string, value: any): Promise<void> {
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return this.db.list('/mp_loaners', ref => ref.orderByChild("name")).update(key, value);;
    }else{
      return this.db.list('/glu_loaners', ref => ref.orderByChild("name")).update(key, value);;
   
    
  }
  
}


getByName(name:string): AngularFireList<Loaners>{
  var store=localStorage.getItem("chosenStore");
  if (store=="Pricinovic"){
  return this.db.list('/glu_loaners', ref => ref.orderByChild("name") 
  .startAt(name)  .endAt(name+"\uf8ff")
 );
}else{
  return this.db.list('/mp_loaners', ref => ref.orderByChild("name") 
  .startAt(name)  .endAt(name+"\uf8ff"));
}
}

add(loaner: Loaners): any {
    
  var store=localStorage.getItem("chosenStore");
  if (store=="Pricinovic"){
  
    var someRef=this.db.database.ref().child('mp_loaners').push();
    var newId=someRef.key;
    loaner.id=newId;
  return someRef.set(loaner);
  }else{
    var someRef=this.db.database.ref().child('glu_loaners').push();
  
    var newId=someRef.key;
    loaner.id=newId;
    return someRef.set(loaner);
  }
}

}
