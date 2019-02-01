import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandesPage } from './commandes';

@NgModule({
  declarations: [
    CommandesPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandesPage),
  ],
})
export class CommandesPageModule {}
