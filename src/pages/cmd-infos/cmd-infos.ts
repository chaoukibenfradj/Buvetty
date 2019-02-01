import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Commande } from '../../app/models/commande';

/**
 * Generated class for the CmdInfosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cmd-infos',
  templateUrl: 'cmd-infos.html',
})
export class CmdInfosPage {
  prod = {} as Commande ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.prod = this.navParams.get("item");
    console.log(this.prod);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CmdInfosPage');
  }

}
