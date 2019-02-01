import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  listEvents : Observable<any>;
  spin : boolean = true ;
  currentUser : any ; 

  constructor(public loading:LoadingController,public alert:AlertController, public afd: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {

    this.currentUser =JSON.parse(localStorage.getItem("currentUser"));


  }

  ionViewDidLoad() {

      
    console.log("hello init");
    this.spin = true;
    this.listEvents = this.afd.list('/events/').snapshotChanges().map(
      changes => {
        this.spin = false;
        return changes.map(c => (
          {
            key: c.payload.key, ...c.payload.val()
          }
        ));
      }
    );



  }

  interss(event){
    console.log(event);


    let alrt = this.alert.create({
      mode:"ios", 
      title:"Succès",
      message:"Ajouté avec succès !"

    });

    let ld = this.loading.create({
      spinner : "dots", 
      content:"En Cours ..."
    }); 
    ld.present() ;

    this.afd.list("/events/"+event.key+"/subscribers/").push(this.currentUser).then(
      data=>{

        ld.dismiss();
        alrt.present();

      }
    );

    



  }

}
