import { LocalNotifications } from '@ionic-native/local-notifications';
import { TmpcmdsPage } from './../tmpcmds/tmpcmds';
import { AngularFireAuth } from 'angularfire2/auth';
import { CoffeePage } from './../coffee/coffee';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AnimationService, AnimationBuilder } from 'css-animator';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('elementCard') elementCard ;

  private animation: AnimationBuilder;

  constructor(public animationService:AnimationService, public localNotfi : LocalNotifications , public angularFireAuth:AngularFireAuth, public menuCtrl : MenuController, public navCtrl: NavController, public fireBaseProvider: FirebaseProvider) {
    this.menuCtrl.enable(true);
    this.animation = this.animationService.builder();
    this.angularFireAuth.authState.subscribe(user=>{
      console.log(user.uid);
      if(user==null){
        this.navCtrl.setRoot(LoginPage);
      }
    });
    console.log("length  = "+ this.fireBaseProvider.getProdQuantity());
  }
  
  public toCoffeePage(prodType){
      this.navCtrl.push(CoffeePage, {prodType:prodType}) ;
  }

  public openMyCommandes() {
    this.navCtrl.push(TmpcmdsPage);
  }

  public testNotfi(){
    console.log("test notif") ;
    this.localNotfi.schedule({
      id: 1, 
      text:"Test Notification !",
      sound: 'file://assets/sounds/notif.mp3', 
      data : { title : "heyy fuckers "}, 
      led:'FFFF00', 
      lockscreen: true,
    });
  }



}
