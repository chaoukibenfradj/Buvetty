import { CommenterProdPage } from './../commenter-prod/commenter-prod';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShowProduitInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-produit-info',
  templateUrl: 'show-produit-info.html',
})
export class ShowProduitInfoPage {
  keyProd : string ; 
  product : any ; 
  listCommentaire : any ;
  constructor(public afd: AngularFireDatabase ,public navCtrl: NavController, public navParams: NavParams) {
    this.keyProd = this.navParams.get("keyPord");
    this.afd.object("/produits/"+this.keyProd).subscribe(data=>{
      this.product = data ;
    }) ;

  



  }
  public commenter(key){
    this.navCtrl.push(CommenterProdPage, {keyProd : key});
  }

  ionViewDidLoad() {
    this.afd.list("/produits/"+this.keyProd+"/commentaire/").subscribe(data=>{
      this.listCommentaire = data;
      console.log(data);
    });
  }

}
