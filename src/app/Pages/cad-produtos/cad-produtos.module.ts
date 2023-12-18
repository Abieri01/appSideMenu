import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadProdutosPageRoutingModule } from './cad-produtos-routing.module';

import { CadProdutosPage } from './cad-produtos.page';

import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    MaskitoModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CadProdutosPageRoutingModule
  ],
  declarations: [CadProdutosPage]
})
export class CadProdutosPageModule {}
