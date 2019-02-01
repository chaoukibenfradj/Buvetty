import { Profile } from './../../app/models/profile';
import { favModel } from './../../app/models/favModel';
import { User } from './../../app/models/user';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { TmpCmdsObj } from '../../app/models/tmpCmds';
import { Commande } from '../../app/models/commande';


@IonicPage()
@Component({
  selector: 'page-tmpcmds',
  templateUrl: 'tmpcmds.html',
})
export class TmpcmdsPage {
  cmds = {} as TmpCmdsObj;
  cmdDB = {} as Commande;
  list: Array<any>;
  totalprice: number = 0.0;
  constructor(public alertCtrl:AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
    this.cmds = JSON.parse(localStorage.getItem("tmpcmd"));
    if (this.cmds != null && this.cmds.listProdsCmds != null) {
      this.list = this.cmds.listProdsCmds;
      this.calculPrix();
    } else {

    }
  }

  public calculPrix() {
    this.totalprice = 0;
    if (this.cmds != null) {
      console.log(this.list);
      this.list.forEach(element => {

        this.totalprice += parseFloat(element.prix);
      });
      this.totalprice = parseFloat(this.totalprice.toFixed(2));
    }
  }
  public commander() {
    let dateTime = new Date().valueOf();

    if (this.list.length > 0) {
      let ld = this.loadingCtrl.create({
        spinner: 'dots',
        content: "Envoie en cours ..."
      });
      ld.present();

      this.cmdDB.datecommande = dateTime;
      this.cmdDB.listProds = this.list;
      this.cmdDB.traited = "false";
      const localUser = JSON.parse(localStorage.getItem("currentUser"));
      this.cmdDB.user = localUser;
      console.log(this.cmdDB);
      this.cmdDB.totalprice = this.totalprice;
      this.afd.list("/commandes/").push(this.cmdDB).then(res => {
        this.list.splice(0);
        this.cmds.listProdsCmds = this.list;
        localStorage.setItem("tmpcmd", JSON.stringify(this.cmds));
        this.calculPrix();
        let toast = this.toastCtrl.create({
          message: "Commande envoyé avec succès !",
          duration: 3000,
          showCloseButton: true,
        });
        toast.present();
        ld.dismiss();

      }, err => {

      });
    } else {
      console.log("liste vide !");
      let toast = this.toastCtrl.create({
        message: "Liste vide !",
        duration: 3000,
        showCloseButton: true,
      });
      toast.present();
    }





  }


  public saveAsFav() {
    console.log("save as fav");
    let user = JSON.parse(localStorage.getItem("currentUser")) as Profile;
    let toast = this.toastCtrl.create({
      closeButtonText: "Fermer",
      message: "Liste vide !",
      showCloseButton:true,
      duration: 3000,
    });

    if (this.list.length > 0) {

      let prompt = this.alertCtrl.create({
        title:"Nom de liste",
        inputs:[{
          name:"listFav",
          checked:true, 
          placeholder:"Nom de la liste" 
        }],
       
        buttons: [
          {
            text: 'Annuler',
            handler: data => {
            console.log('Cancel clicked');
            }
          },
          {
            text: 'Enregistrer',
            handler: data => {
              console.log('Saved clicked');
              console.log(data);
              
              if(data.listFav.length==0){
                toast.setMessage("Nom vide !");
                toast.present();
              }else{
                //save fav list 
                let fav ={} as favModel ;
                fav.dateCreation = new Date().valueOf();
                fav.nomList = data.listFav ; 
                fav.listProd = this.list ;
                fav.uid = user.uid ; 
                let ld = this.loadingCtrl.create({
                  content:"Sauvegarde en cours ...", 
                  spinner:"dots"
                });
                ld.present();
                this.afd.list("/favCmds/").push(fav).then(xData=>{
                  toast.setMessage("List ajouté avec succès !");
                  toast.present();
                  ld.dismiss();
                });
                console.log(fav);

                
                
              }
              
            }
          }
        ]
  

      });
      prompt.present();

    } else {
      toast.present();
    }

  }

  public removeItem(prodIndex) {
    this.list.splice(prodIndex, 1);

    this.cmds.listProdsCmds = this.list;
    localStorage.setItem("tmpcmd", JSON.stringify(this.cmds));
    this.calculPrix();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TmpcmdsPage');
  }

}
