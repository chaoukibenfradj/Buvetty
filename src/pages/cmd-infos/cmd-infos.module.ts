import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CmdInfosPage } from './cmd-infos';

@NgModule({
  declarations: [
    CmdInfosPage,
  ],
  imports: [
    IonicPageModule.forChild(CmdInfosPage),
  ],
})
export class CmdInfosPageModule {}
