import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { query } from '@angular/core/src/animation/dsl';
import { CmdInfosPage } from '../cmd-infos/cmd-infos';

@IonicPage()
@Component({
  selector: 'page-mes-commandes',
  templateUrl: 'mes-commandes.html',
})
export class MesCommandesPage {
uid :string;
spin : boolean = true ;
listCmds : Observable<any>;
listCmdsUser : Array<any>;
  constructor(public qr :BarcodeScanner , public afd:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

    this.uid = JSON.parse(localStorage.getItem("currentUser")).uid ;
  }

  ionViewDidLoad() {

    this.spin = true;
    this.listCmds = this.afd.list('/commandes/', ref => ref.orderByChild("/user/uid").equalTo(this.uid)).snapshotChanges().map(
      changes => {
        this.spin = false ;
        return changes.map(c => (
          {
            key: c.payload.key, ...c.payload.val()
          }
        ));
      }
    );
    console.log(this.listCmds);
  }

  public showQrCode(keyCmd){
    console.log(keyCmd);

    this.qr.encode(this.qr.Encode.TEXT_TYPE, keyCmd).then(data=>{
      console.log(data);

    }).catch(err=>{
      alert(JSON.stringify(err));
    });
  }

  showCmdInfos(item){
    this.navCtrl.push(CmdInfosPage, {item:item});
  }

}



