import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TmpcmdsPage } from './tmpcmds';

@NgModule({
  declarations: [
    TmpcmdsPage,
  ],
  imports: [
    IonicPageModule.forChild(TmpcmdsPage),
  ],
})
export class TmpcmdsPageModule {}
