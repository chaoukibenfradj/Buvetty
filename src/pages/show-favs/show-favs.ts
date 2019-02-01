import { favModel } from './../../app/models/favModel';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Profile } from './../../app/models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ShowFavsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-favs',
  templateUrl: 'show-favs.html',
})
export class ShowFavsPage {
  userProfile ={} as Profile ; 
  listFavList : Observable<any>;

  constructor(public lodingCtrl:LoadingController,public toastCtrl:ToastController, public afd: AngularFireDatabase , public navCtrl: NavController, public navParams: NavParams) {
    this.userProfile = JSON.parse(localStorage.getItem("currentUser"));
  

    this.listFavList = this.afd.list('/favCmds/', ref => ref.orderByChild("uid").equalTo(this.userProfile.uid)).snapshotChanges().map(
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
    console.log(this.listFavList);
    console.log('ionViewDidLoad ShowFavsPage');
  }

  public deleteFav(keyItem){

    let load = this.lodingCtrl.create({
      spinner:"dots",
      content:"Suppression en cours ..."
    });
    load.present();
    let toast = this.toastCtrl.create({
      message:"Supprimé avec succès",
      duration:3000,
      showCloseButton:true,
      closeButtonText:"Fermer",
    });
    
    this.afd.list("/favCmds/").remove(keyItem).then(data=>{
      load.dismiss();
      toast.present();
    });
  }

}
