import { EventsPage } from './../pages/events/events';
import { HideHeaderDirective } from './../directives/hide-header/hide-header';
import { ProfilePage } from './../pages/profile/profile';
import { ShowFavsPage } from './../pages/show-favs/show-favs';
import { CommenterProdPage } from './../pages/commenter-prod/commenter-prod';
import { TmpcmdsPage } from './../pages/tmpcmds/tmpcmds';
import { MesCommandesPage } from './../pages/mes-commandes/mes-commandes';
import { CommandesPage } from './../pages/commandes/commandes';
import { Keyboard } from '@ionic-native/Keyboard';
import { CoffeePage } from './../pages/coffee/coffee';
import { CreateAccountPage } from './../pages/create-account/create-account';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController, Events } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { BarcodeScanner } from "@ionic-native/barcode-scanner"
import { ShowProduitInfoPage } from '../pages/show-produit-info/show-produit-info';
import { AnimationService, AnimatesDirective, AnimatorModule } from 'css-animator'
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CmdInfosPage } from '../pages/cmd-infos/cmd-infos';
import { RotateMenuDirective } from '../directives/rotate-menu/rotate-menu';
import { HeaderColor } from "@ionic-native/header-color" ;

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyClR61qqEtsNV7x8FLHdNMb8L9tCVzWkbk",
  authDomain: "buvetti-aa1c9.firebaseapp.com",
  databaseURL: "https://buvetti-aa1c9.firebaseio.com",
  projectId: "buvetti-aa1c9",
  storageBucket: "buvetti-aa1c9.appspot.com",
  messagingSenderId: "293890061728"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CreateAccountPage,
    CoffeePage,
    CommandesPage,
    MesCommandesPage,
    TmpcmdsPage,
    ShowProduitInfoPage,
    CommenterProdPage,
    AnimatesDirective,
    NotificationsPage,
    CmdInfosPage,
    ShowFavsPage,
    ProfilePage,
    HideHeaderDirective,
    RotateMenuDirective, 
    EventsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CreateAccountPage,
    CoffeePage,
    CommandesPage,
    MesCommandesPage,
    TmpcmdsPage,
    ShowProduitInfoPage,
    CommenterProdPage,
    NotificationsPage,
    CmdInfosPage,
    ShowFavsPage,
    ProfilePage, 
    EventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider,
    AngularFireDatabase,
    DatePicker,
    Camera,
    Keyboard,
    BarcodeScanner,
    AnimationService,
    LocalNotifications, 
    HeaderColor

  ]
})
export class AppModule { }
