
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Ambalaza from '../models/ambalaza.model';
import AmbalazaLoaner from '../models/ambalazaloaner.model';

@Injectable({
  providedIn: 'root'
})
export class AmbalazaDetailService {

  constructor(private db:AngularFireDatabase) { 
 


  }


  getAll(id:any) : AngularFireList<Ambalaza>{
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
   return this.db.list('/mp_bottles', ref => ref.child(id));
    }else{
      
   return this.db.list('/glu_bottles', ref => ref.child(id));
    }
  }
  getAllWithDates(id:any) : AngularFireList<Ambalaza>{
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return this.db.list('/mp_bottle_date', ref => ref.child(id).orderByChild("date"));
    }else{
      
    return this.db.list('/glu_bottle_date', ref => ref.child(id).orderByChild("date"));
    }
   }
  async getChildren():Promise<Ambalaza[]>{
    
    let ambalaze:Ambalaza[]=[];
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    return    await   this.db.database.ref("mp_bottle_date").once("value")
       .then(function(snapshot:any) {
         
         snapshot.forEach(function(childSnapshot:any) {
         
           childSnapshot.forEach(function(grandchildSnapshot:any) {
           
          let a:Ambalaza=grandchildSnapshot.val();
        
          ambalaze.push(a);
           }
           )
      
      
       });
       
       
   return ambalaze
       });;
      }else{
        return    await   this.db.database.ref("glu_bottle_date").once("value")
        .then(function(snapshot:any) {
          
          snapshot.forEach(function(childSnapshot:any) {
          
            childSnapshot.forEach(function(grandchildSnapshot:any) {
            
           let a:Ambalaza=grandchildSnapshot.val();
         
           ambalaze.push(a);
            }
            )
       
       
        });
        
        
    return ambalaze
        });;
        
      }
  }

  

  async getChildrenForSum(databaseName:string):Promise<Ambalaza[]>{
    
    let ambalaze:Ambalaza[]=[];
    return    await   this.db.database.ref(databaseName).once("value")
       .then(function(snapshot:any) {
         
         snapshot.forEach(function(childSnapshot:any) {
        
           childSnapshot.forEach(function(grandchildSnapshot:any) {
           
          let a:Ambalaza=grandchildSnapshot.val();
        
          ambalaze.push(a);
           }
           )
      
      
       });
       
       
   return ambalaze
       });;
    
  }
  async getBeerLoaners(databaseName:string,beerType:string):Promise<Ambalaza[]>{
 
    let ambalaze:Ambalaza[]=[];
    return    await   this.db.database.ref(databaseName).once("value")
       .then(function(snapshot:any) {
         
         snapshot.forEach(function(childSnapshot:any) {
           childSnapshot.forEach(function(grandchildSnapshot:any) {
       
          let a:Ambalaza=grandchildSnapshot.val();

          if (a.tip==beerType){
          ambalaze.push(a);
          }
          }
           
           )
      
      
       });
       
       
   return ambalaze
       });;
    
  }

  ///ambalaza return logic

  update(ambalaza:Ambalaza,userId:string,key: string, value: any): Promise<void> {
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
   
      return this.db.list('/mp_bottles', ref => ref.child(userId)).update(key,value);
    }else{
     
      return this.db.list('/glu_bottles', ref => ref.child(userId)).update(key,value);
    
    }
  }


addToDates(ambalaza:Ambalaza,userId:string){
  var store=localStorage.getItem("chosenStore");
  if (store=="Pricinovic"){
    var someRef=this.db.database.ref().child('mp_bottle_date').child(userId).push();
    var newId=someRef.key;
    ambalaza.id=newId;
   
     someRef.set(ambalaza);
  }else{
    var someRef=this.db.database.ref().child('glu_bottle_date').child(userId).push();
    var newId=someRef.key;
    ambalaza.id=newId;
   
     someRef.set(ambalaza);
  }
}
   //insertingNewAmbalaza
  addNewAmbalaza(userId:string,ambalaza: Ambalaza):boolean {
  
    var store=localStorage.getItem("chosenStore");
    if (store=="Pricinovic"){
    var someRef=this.db.database.ref().child('mp_bottle_date').child(userId).push();
     var newId=someRef.key;
     ambalaza.id=newId;
    
      someRef.set(ambalaza);

      var newRef=this.db.database.ref().child("mp_bottles").child(userId).child(ambalaza.tip!);
      var updRef=this.db.database.ref().child("mp_bottles").child(userId);
     var ref = this.db.database.ref("mp_bottles").child(userId).child(ambalaza.tip!);
     ref.once("value")
       .then(function(snapshot) {
         if( snapshot.exists()){

         var newGajba= snapshot.child("gajba").val()!+ambalaza.gajba!;
         var newFlase=snapshot.child("flase").val()!+ambalaza.flase!;
         var data:any={gajba:newGajba,
                        flase:newFlase};
            
          updRef.child(ambalaza.tip!).update(data);
          return false;

        }  // true
         else{
          //alert("ne postoji");
          
    var loaner:AmbalazaLoaner= JSON.parse( localStorage.getItem("chosenBottleLoaner") || '{}');
         ambalaza.returned=loaner.name;
           newRef.set(ambalaza);
           //update zaduzen
          return true;
          }
     
       })

      
    }else{
    //   var someRef=this.db.database.ref().child('glu_bottle_date').push();
    // var newId=someRef.key;
    // ambalaza.id=newId;
    //  someRef.set(ambalaza);
    var someRef=this.db.database.ref().child('glu_bottle_date').child(userId).push();
    var newId=someRef.key;
    ambalaza.id=newId;
   
     someRef.set(ambalaza);

     var newRef=this.db.database.ref().child("glu_bottles").child(userId).child(ambalaza.tip!);
     var updRef=this.db.database.ref().child("glu_bottles").child(userId);
    var ref = this.db.database.ref("glu_bottles").child(userId).child(ambalaza.tip!);
    ref.once("value")
      .then(function(snapshot) {
        if( snapshot.exists()){
        var newGajba= snapshot.child("gajba").val()!+ambalaza.gajba!;
        var newFlase=snapshot.child("flase").val()!+ambalaza.flase!;
        var data:any={gajba:newGajba,
                       flase:newFlase};
           
         updRef.child(ambalaza.tip!).update(data);
     
         return false;
       }  // true
        else{
         //alert("ne postoji");
               
    var loaner:AmbalazaLoaner= JSON.parse( localStorage.getItem("chosenBottleLoaner") || '{}');
    ambalaza.returned=loaner.name;
          newRef.set(ambalaza);
          return true;
        }
    
      })

    }
    return true;
  }

 
  delete(userId:string, key: string): Promise<void> {
    var store=localStorage.getItem("chosenStore");
    
    if (store=="Pricinovic"){
      var newRef=this.db.database.ref().child("mp_bottles").child(userId).child(key);
      return newRef.remove();
    }else{
      var newRef=this.db.database.ref().child("glu_bottles").child(userId).child(key);
      return newRef.remove();
    }
  }
    

}
