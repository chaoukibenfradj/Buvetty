import { MyApp } from './../../app/app.component';
import { Profile } from './../../app/models/profile';
import { CreateAccountPage } from './../create-account/create-account';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { HomePage } from './../home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, LoadingController, Events } from 'ionic-angular';
import { User } from '../../app/models/user';
import { AngularFireAuth } from 'angularfire2/auth' ;
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  creatAccount : any ; 
  user = {} as User  ;
  profile={} as Profile ; 
  listProduitsRef$ : FirebaseListObservable<any[]> ;

  loginCreds = { email: '', password: '' };
  constructor(private events : Events , private loadCtrl : LoadingController,private database : AngularFireDatabase,
    public menuCtrl: MenuController,
    public firebaseAuth : AngularFireAuth ,public fireBaseProvider: FirebaseProvider , public statusBar:StatusBar,public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  this.statusBar.hide();
  this.menuCtrl.enable(false) ;
  this.creatAccount = CreateAccountPage ;

  }

  public login(){
    let loading = this.loadCtrl.create({
      spinner:'dots',
      content: "Authentification en cours<br>Veuillez patientez..."
    });
    loading.present();
      this.firebaseAuth.auth.signInWithEmailAndPassword(this.loginCreds.email, this.loginCreds.password).then(
        data=>{
          console.log(data);
          this.database.list("/userProfiles/", {query: {
            orderByChild: 'uid',
            equalTo: this.firebaseAuth.auth.currentUser.uid 
          }}
          ).subscribe(dataUser=>{
              localStorage.setItem("currentUser", JSON.stringify(dataUser[0]));
              loading.dismiss();
              this.events.publish("user:logged");
              this.navCtrl.setRoot(HomePage);
            });
          
          
        }
      ).catch(err=>{
        loading.dismiss();
        if(err.code=="auth/invalid-email"){
          this.showAlert("Problème","E-mail invalide !<br> Veuillez vérifier votre Email");
        }else if(err.code=="auth/user-not-found"){
          this.showAlert("Problème","Utilisateur est introuvable !");
        }else{
          this.showAlert("Problème", err.message);
        }
        console.log(err);



      });
  }

  showAlert(title,message){
    let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    mode:"ios",
    buttons: ['Fermer'],
    }); 
    alert.present() ;
    
  }

}
