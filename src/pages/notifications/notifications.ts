import { Profile } from './../../app/models/profile';
import { User } from './../../app/models/user';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  listNotifs : Observable<any>;
  user = {} as Profile ; 
  constructor(public afd:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.listNotifs = this.afd.list('/notifications/', ref => ref.orderByChild("forUser").equalTo(this.user.uid)).snapshotChanges().map(
      changes => {
        return changes.map(c => (
          {
            key: c.payload.key, ...c.payload.val()
          }
        ));
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
