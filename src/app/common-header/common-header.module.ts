import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './common-header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  declarations: [CommonHeaderComponent],
  exports: [ CommonHeaderComponent]
})
export class CommonHeaderModule { }
