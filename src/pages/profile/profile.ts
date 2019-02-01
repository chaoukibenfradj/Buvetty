import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './../../app/models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileUser = {} as Profile ;
  userKey : string ;
  constructor(public afd:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.profileUser = JSON.parse(localStorage.getItem("currentUser"));
    this.afd.list("/userProfiles/").snapshotChanges().subscribe(data=>{

      console.log("hello there");
      console.log(data);

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
