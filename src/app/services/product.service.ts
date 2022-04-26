import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Product from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }


  getAll(): AngularFireList<Product> {

    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return this.db.list('/mp_product', ref => ref.orderByChild("category"));
    }else{
      return this.db.list('/glu_product', ref => ref.orderByChild("category"));
   
    }
  }
}
