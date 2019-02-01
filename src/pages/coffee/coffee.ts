import { HideHeaderDirective } from './../../directives/hide-header/hide-header';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { ShowProduitInfoPage } from './../show-produit-info/show-produit-info';
import { TmpcmdsPage } from './../tmpcmds/tmpcmds';
import { AngularFireAuth } from 'angularfire2/auth';
import { Commande } from './../../app/models/commande';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { TmpCmdsObj } from '../../app/models/tmpCmds';
import { AnimationService, AnimationBuilder } from 'css-animator';


/**
 * Generated class for the CoffeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coffee',
  templateUrl: 'coffee.html',
})
export class CoffeePage {
  listCoffee: Observable<any>;
  cmd = {} as Commande;
  listCmds = {} as TmpCmdsObj;
  uid: string;
  spin: boolean = true;
  mode: boolean = false;
  prodType : string ;
  @ViewChild('myBadge') myBadge;
  @ViewChild('listAnim') myListAnim ;
  private animation: AnimationBuilder;
  constructor(public toast: ToastController, public animationService: AnimationService, public fireBaseProvider: FirebaseProvider, public toastCtrl: ToastController, public auth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
    let usr = JSON.parse(localStorage.getItem("currentUser"));
    this.uid = usr.uid;
    this.animation = this.animationService.builder();
    this.prodType = this.navParams.get("prodType") ; 
    console.log(this.prodType);
  }

  ionViewDidLoad() {
    this.spin = true;
    this.listCoffee = this.afd.list('/produits/', ref => ref.orderByChild("prodType").equalTo(this.prodType)).snapshotChanges().map(
      changes => {
        this.spin = false;
        this.animation.setType("fadeInLeft").show(this.myListAnim.nativeElement);
        return changes.map(c => (
          {
            key: c.payload.key, ...c.payload.val()
          }
        ));
      }
    );
    console.log(this.listCoffee);


  }

  public commander(prod) {

    const tmpcmd = localStorage.getItem("tmpcmd");
    if (tmpcmd == null) {
      console.log("pas de commande en cours !");
      this.listCmds.listProdsCmds = [];
      this.listCmds.listProdsCmds.push(prod);
      console.log("creation en cours !");
      localStorage.setItem("tmpcmd", JSON.stringify(this.listCmds));
    } else {
      this.listCmds = JSON.parse(localStorage.getItem("tmpcmd"));
      this.listCmds.listProdsCmds.push(prod);
      localStorage.setItem("tmpcmd", JSON.stringify(this.listCmds));
      console.log(this.listCmds);
    }

    let tst = this.toastCtrl.create({
      duration: 2000,
      message: prod.titreCoffee + " est dans votre panier !",
      showCloseButton: true,
      closeButtonText: "Fermer"
    });
    tst.present();


    console.log("add to cmds");
    this.animation.setType("flipInX").show(this.myBadge.nativeElement);


  }

  public showProdInfo(key) {
    console.log("prod to show : " + key);
    this.navCtrl.push(ShowProduitInfoPage, { keyPord: key });

  }

  public openMyCommandes() {
    this.navCtrl.push(TmpcmdsPage);
  }

  public viewToggle() {
    console.log("show toggle");
    this.spin = true;
    if (this.mode == false) {
      this.mode = true;
    } else {
      this.mode = false;
    }
    this.animation.setType("fadeInLeft").show(this.myListAnim.nativeElement);
  }


}
