import { HeaderColor } from '@ionic-native/header-color';
import { LoginPage } from './../login/login';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from './../../app/models/profile';
import { DatePicker } from '@ionic-native/date-picker';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  userCreds = { dateNaissance : '', sexe : ''} ;
  imageProfileLink = 'assets/imgs/defaultUser.png' ;
  profileUser = {} as Profile ;

  constructor(private datePicker: DatePicker ,
    public navCtrl: NavController,
    public loadCtrl :LoadingController ,
    public angAuth :AngularFireAuth,
    public afd : AngularFireDatabase,
    public navParams: NavParams,
    public camera : Camera,
    public alertCtrl : AlertController
  ) {
      this.profileUser.sexe = "h" ;
      this.profileUser.profileImage = this.imageProfileLink ;
  }

  public uploadPicture(){
    console.log("Time to change !");

    const options: CameraOptions = {
      quality: 100, 
     
      correctOrientation : true,
      allowEdit:true,      
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    } ;
    this.camera.getPicture(options).then((imageData)=>{
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageProfileLink = base64Image ;
      this.profileUser.profileImage = this.imageProfileLink ;
      console.log(this.imageProfileLink);
    },
  (err)=>{

  }
  );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAccountPage');

  }

  public showMessage(title, message){

    let alert = this.alertCtrl.create({
      title : title,
      mode:"ios",
      subTitle:message,
      buttons : ['Fermer']
    });
    alert.present();
  }



  public creerCompte(){
    let loading = this.loadCtrl.create({
      spinner:'dots', 
      content:"Création en cours<br>Veuillez patientez ..."
    });
    loading.present();
    this.angAuth.auth.createUserWithEmailAndPassword(this.profileUser.email, this.profileUser.password).then(
      data=>{
        console.log(data);
        loading.setContent("Envoie d'information en cours ...");
        this.profileUser.uid = data.uid ; 
        if(this.profileUser.profileImage=="assets/imgs/defaultUser.png"){
          console.log("why you didnt put a picture dude ? are u camera Phobe !");
        }else{
        storage().ref("profilePictures/"+data.uid).putString(this.profileUser.profileImage,'data_url').then(pic=>{
        this.profileUser.profileImage = pic.downloadURL ;  
        
        }).catch(errPic=>{
          this.showMessage("Problème", "Erreur d'Upload d'image !");
        });
      }
        this.afd.list("/userProfiles").push(this.profileUser);
        loading.dismiss();
        this.showMessage("Succès","Compte crée avec succès ! :)");
        this.navCtrl.setRoot(LoginPage);
      }
    ).catch(err=>
    {
      loading.dismiss();
      if(err.code=="auth/email-already-in-use"){
        this.showMessage("Problème","Email déjà inscrit !");
      }else{
        this.showMessage("Problème",err.message);
      }
      console.log(err);
    }
    );
  }


}
