import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage-encrypt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleDashboardModule } from './features/module-dashboard/module-dashboard.module';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { NotFoundComponent } from './shared/not-Found/not-Found.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent],
  imports: [
    LocalStorageModule.forRoot({
      prefix: 'gis',
      storageType: 'localStorage',
      encryptionActive: true,
      encryptionOptions: {
        encryptionKey: 'keyAdminEncriptEmfi21',
        encryptionIv: 'iVAdminEmfi21',
        encryptionSalt: '$2b$06$ZUVBucq.Mek83ZRSL4dm.u',
      },
    }),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ModuleDashboardModule,
  ],
  exports: [BrowserAnimationsModule],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
