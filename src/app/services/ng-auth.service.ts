import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class NgAuthService {
  userState: any;
  stringUser: string;
  constructor(public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone) {
    this.afAuth.authState.subscribe(user => {
      this.stringUser = JSON.parse(localStorage.getItem('user') || '{}');

    })
  }

  SignIn(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password)

  }
}
