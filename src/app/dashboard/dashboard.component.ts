import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Observable<any>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.items = this.db.collection('bc_incoming_orders').valueChanges()
  }

}
