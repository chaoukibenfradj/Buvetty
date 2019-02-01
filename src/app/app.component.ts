import { HeaderColor } from '@ionic-native/header-color';
import { ProfilePage } from './../pages/profile/profile';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MesCommandesPage } from './../pages/mes-commandes/mes-commandes';
import { CommandesPage } from './../pages/commandes/commandes';
import { Profile } from './models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Keyboard } from '@ionic-native/Keyboard';
import { CoffeePage } from './../pages/coffee/coffee';
import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, LoadingController, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ShowFavsPage } from '../pages/show-favs/show-favs';
import { EventsPage } from '../pages/events/events';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  userProfile = {} as Profile;
  userDataReady = false;
  pages: Array<{ iconName: string, title: string, component: any }>;

  constructor(public header: HeaderColor, public firebase: FirebaseProvider, public localNotfi: LocalNotifications, public menuCtrl: MenuController, public events: Events, private loadin: LoadingController, public afd: AngularFireDatabase, public angularFireAuth: AngularFireAuth, public keyboard: Keyboard, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.header.tint("#faae54");
    this.initializeApp();
    //this.statusBar.hide();

    this.pages = [
      { iconName: 'cart-arrow-down', title: 'Mes commandes', component: MesCommandesPage },
      { iconName: 'calendar', title: 'Evenements', component: EventsPage },
      { iconName: 'heart', title: 'Mes Favoris', component: ShowFavsPage },
      { iconName: 'bell', title: 'Notifications', component: NotificationsPage },
      { iconName: 'user-circle', title: 'Mon profile', component: ProfilePage }
    ];
    this.events.subscribe("user:logged", () => {
      console.log("Ssup guys i'm IN the shit !");
      this.loadDataUser();

    });
    this.firebase.loadNotifications();
    console.log("App Started !");
    console.log("log");

    if (localStorage.getItem("currentUser") == null) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = HomePage;
      this.userProfile = JSON.parse(localStorage.getItem("currentUser"));
      console.log(this.userProfile);
    }
  }



  ionViewDidLoad() {

  }

  loadDataUser() {
    if (localStorage.getItem("currentUser") == null) {
      this.rootPage = LoginPage;
    } else {
      console.log("---------Logged---------");
      this.userDataReady = true;
      this.userProfile = JSON.parse(localStorage.getItem("currentUser"));
      console.log(this.userProfile);
      console.log("------------------------");
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.keyboard.disableScroll(true);
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString("#faae54");
      this.statusBar.hide();

    });
  }
  public logOut() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("tmpcmd");
    localStorage.clear();
    let loading = this.loadin.create({
      spinner: "dots",
      content: "Déconnxion en cours<br>Veuillez patientez..."
    });
    loading.present();

    this.angularFireAuth.auth.signOut().then(data => {
      console.log(data);

      console.log("logging out");
      loading.dismiss();

      this.nav.setRoot(LoginPage);
    }).catch(err => {
      console.log(err);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push(page.component);
  }
}
