import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CommandesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html',
})
export class CommandesPage {
data : any; 
option : BarcodeScannerOptions ;
  constructor(public barCrtl:BarcodeScanner,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandesPage');
  }

  testCode(){
    this.option = {
        prompt:"Start Scan",
        showFlipCameraButton:true,
        showTorchButton:true,
  
        } ;
    console.log("start scan");
    this.barCrtl.scan(this.option).then(data=>{
      this.data = data ;
    }).catch(err=>{
      console.log(err.message);
    });
  }

  testCode1(){
    this.option = {
        prompt:"Start Scan",
        showFlipCameraButton:true,
        showTorchButton:true,
  
        } ;
    console.log("start scan");
    this.barCrtl.encode(this.barCrtl.Encode.TEXT_TYPE, "this is Chaouki Bitches !").then(
      data=>{
        console.log(data);
      }
    ).catch();
  }



}

