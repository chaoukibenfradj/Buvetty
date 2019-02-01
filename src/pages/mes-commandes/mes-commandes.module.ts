import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesCommandesPage } from './mes-commandes';

@NgModule({
  declarations: [
    MesCommandesPage,
  ],
  imports: [
    IonicPageModule.forChild(MesCommandesPage),
  ],
})
export class MesCommandesPageModule {}
