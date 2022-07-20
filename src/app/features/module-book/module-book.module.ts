import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleBookRoutingModule } from './module-book-routing.module';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';
import { AvailableBookComponent } from './available-book/available-book.component';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddBookComponent,
    ListBookComponent,
    AvailableBookComponent,
    DetailBookComponent,
  ],
  imports: [CommonModule, ModuleBookRoutingModule, PipesModule, FormsModule],
})
export class ModuleBookModule {}
