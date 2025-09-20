import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { ProfileModule } from './profile/profile.module';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_6W6n8xHuJ',
      userPoolClientId: '1gpb3go1l3ppgdp6akq4dpft32'
    }
  }
});

// Configure session storage for auth tokens
if (typeof window !== 'undefined') {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key: string, value: string) {
    if (key.includes('amplify') || key.includes('cognito')) {
      sessionStorage.setItem(key, value);
    } else {
      originalSetItem.call(this, key, value);
    }
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    FormsModule,
    AgGridModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
