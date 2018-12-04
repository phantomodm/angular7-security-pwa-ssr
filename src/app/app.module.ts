import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, Inject, APP_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatButtonModule,
  MatRadioModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher

} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { AuthGuard } from 'src/app/core/auth.guard';


const fireBaseConfig = {
  'apiKey': 'AIzaSyCkp407xf8bgxd0ArJWkSyWCHuXDtwP_Lw',
  'authDomain': 'bc-firebase-db.firebaseapp.com',
  'databaseURL': 'https://bc-firebase-db.firebaseio.com',
  'projectId': 'bc-firebase-db',
  'storageBucket': '',
  'messagingSenderId': '818358738961'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'a7-security-pwa-ssr'}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  providers: [AuthService, UserService, AuthGuard,
  {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string) {
                const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
                console.log(`Running ${platform} with appId=${appId}`);
  }
}


