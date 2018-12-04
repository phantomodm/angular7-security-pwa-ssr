import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let user = firebase.auth().onAuthStateChanged(
        // tslint:disable-next-line:no-shadowed-variable
        function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      // tslint:disable-next-line:semicolon
      })
    // tslint:disable-next-line:semicolon
    })
  }

  updateCurrentUser(value) {
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve();
      }, err => reject(err));
    });
  }

}
