import { Component, OnInit, Optional } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { NgAuthService } from '../services/ng-auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(@Optional() public app: AppComponent,public authService: NgAuthService,public auth: AngularFireAuth,private ruter:Router) { }
 greska2: string;
 username: string;
 password: string;
 greska1:string;
  ngOnInit(): void {
    if (localStorage.getItem('user')!=null){
    
      this.app.login=true;
      this.ruter.navigate(['dug']);
    }else{
        this.app.login=false;
      }
  }
login(){
  if(this.username.length==0){
    this.greska1="Korisnicko ime je obavezno";
    if(this.password.length==0){
      this.greska2="Sifra je obavezna";
      return;
    }else{
      this.greska2="";
    }
  }else{
    this.greska1="";
  }
  if(this.password.length==0){
    this.greska2="Sifra je obavezna";
    return;
  }else{
    this.greska2="";
  }
  this.authService.SignIn(this.username,this.password).then((result) => {
   localStorage.setItem('user',this.username);
   
   if (this.username.charAt(0)=='m'){
    localStorage.setItem("chosenStore","Pricinovic");
  }else{
    if(this.username.charAt(0)=='g'){
      localStorage.setItem("chosenStore","Glusci");
  }else{
    //admin?
    localStorage.setItem("chosenStore","Glusci");
  }
}
  this.app.login=true;
  this.app.store=localStorage.getItem("chosenStore")!;
  this.app.user=this.username;
  window.location.reload();
 
  }).catch((error) => {
    window.alert("Pogresni podaci")
  });
}
}
