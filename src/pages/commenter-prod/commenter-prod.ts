import { Commentaire } from './../../app/models/commentaire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-commenter-prod',
  templateUrl: 'commenter-prod.html',
})
export class CommenterProdPage {
  commentaire = {} as Commentaire ;
  product : any ;  
  keyProd : string ;
  user : any ; 
  constructor(public load :LoadingController, public afd :AngularFireDatabase ,public navCtrl: NavController, public navParams: NavParams) {
    console.log("Mettre un commentaire sur : "+ this.navParams.get("keyProd"));
    this.keyProd = this.navParams.get("keyProd") ;
    this.afd.object("/produits/"+this.keyProd).subscribe(data=>{
      this.product = data ;
      console.log(data);
    }) ;
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.commentaire.user = this.user ;
  }
  public commenter(){
    let ld = this.load.create({
      spinner:"dots", 
      content:"Veuillez patientez ..."
    });
    ld.present();
    const date = new Date().valueOf() ;
    this.commentaire.dateCommentaire = date ;
    this.afd.list("/produits/"+this.keyProd+"/commentaire/").push(this.commentaire).then(()=>{
      ld.dismiss();
      this.navCtrl.pop();
    });
    
  }



}
