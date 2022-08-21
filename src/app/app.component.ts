import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ruter: Router, private http: HttpClient) {

  }
  login: boolean = false;
  type: string;
  store: string;
  user: string;
  public isMenuCollapsed = true;
  ngOnInit(): void {
    this.login = false;
    this.user = localStorage.getItem('user')!;

    if (this.user != null) {

      this.login = true;
      this.store = localStorage.getItem('chosenStore')!;

    }

    else {
      this.login = false;
    }

  }

  logOut() {


    this.login = false;
    localStorage.clear();
    this.ruter.navigate(['']);
  }
  pickStore(store: string) {
    if (this.user.charAt(0) == 'a') {
      if (store != localStorage.getItem("chosenStore")) {
        localStorage.setItem("chosenStore", store);
        window.location.reload();
      }
    }
  }


}
