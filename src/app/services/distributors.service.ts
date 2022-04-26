import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Distributor from '../models/distributors.model';

@Injectable({
  providedIn: 'root'
})
export class DistributorsService {

  private dbPath = '/distributors';
 
  loanersRef: AngularFireList<Distributor>;
  constructor(private db:AngularFireDatabase) { 
    
    this.loanersRef=db.list(this.dbPath);
  }


  
  getAll(): AngularFireList<Distributor> {
    return this.loanersRef;
  }

  
  update(key: string, value: any): Promise<void> {
    return this.loanersRef.update(key, value);
  }
  getDistributorByName(name:string) :AngularFireList<Distributor>{
    
  return  this.db.list('/distributors', ref => ref.orderByChild('name').equalTo(name));
    
  }
  add(loaner: Distributor): any {
    
  
      var someRef=this.db.database.ref().child('distributors').push();
      var newId=someRef.key;
      loaner.id=newId;
    return someRef.set(loaner);

  
  }
}
