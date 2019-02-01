import { Profile } from './../../app/models/profile';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TmpCmdsObj } from './../../app/models/tmpCmds';
import { User } from './../../app/models/user';

import { HttpModule } from '@angular/http' ;
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable()
export class FirebaseProvider {
  user = {} as User  ;
  listCmds = {} as TmpCmdsObj;
  userProfile = {} as Profile ;
  constructor(public localNotfi: LocalNotifications,public afd: AngularFireDatabase) {
    console.log("service provider");
    let tmpcmd=JSON.parse(localStorage.getItem("tmpcmd"));
    if(tmpcmd==null){
      this.listCmds.listProdsCmds=[];

      localStorage.setItem("tmpcmd", JSON.stringify(this.listCmds));
    }



  }
  public getProdQuantity() : number{
    let tmp = JSON.parse(localStorage.getItem("tmpcmd")) ;
    if(tmp==null){
      return 0 ;
    }else{
      return tmp.listProdsCmds.length ;
    }
  }




  //place it here

  public loadNotifications() {
    this.userProfile = JSON.parse(localStorage.getItem("currentUser"));
    if(this.userProfile!=null){
      console.log("user is defined");
    this.afd.list("/notifications/", ref =>
      ref.orderByChild("forUser").equalTo(this.userProfile.uid)

    ).valueChanges().subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          console.log("notifs");
          console.log(data);
          data.forEach(element => {
            let obj: any = element;
            if (obj.seen == false) {

              this.localNotfi.schedule({
                id: obj.date,
                title: "Votre commande est prête !",
                text: obj.subject,
                sound: 'file://assets/sounds/notif.mp3',
                data: { title: obj.subject },
                led: 'FFFF00',
                lockscreen: true,
                priority: 2
              });
            }
          });
        }
        this.localNotfi.on("click").subscribe(
          dataNotif => {
            console.log("notif clicked !");
            console.log(dataNotif.id);
            this.afd.list("/notifications/", ref => ref.orderByChild("date").equalTo(dataNotif.id)).snapshotChanges()
              .subscribe(x => {
                let notifKey = x[0].key;
                this.afd.list("/notifications/").update(notifKey, { seen: true }).then(updt => {
                  console.log("notif seen");
                });
              });

          }
        );


      }
    );



  }else{
    console.log("user is undefined !");
  }



  }


  
}