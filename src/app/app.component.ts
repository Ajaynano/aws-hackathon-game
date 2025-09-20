import { Component, OnInit, OnDestroy } from '@angular/core';
import { signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'hello-world';
  sessionExpired = false;
  private sessionTimer: any;
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  formFields = {
    signUp: {
      name: {
        order: 1
      },
      email: {
        order: 2
      },
      password: {
        order: 5
      },
      confirm_password: {
        order: 6
      }
    },
  };

  ngOnInit() {
    this.startSessionTimer();
  }

  ngOnDestroy() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
  }

  startSessionTimer() {
    this.sessionTimer = setTimeout(() => {
      this.expireSession();
    }, this.SESSION_TIMEOUT);
  }

  async expireSession() {
    this.sessionExpired = true;
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  onUserAuthenticated() {
    this.sessionExpired = false;
    this.startSessionTimer();
  }
}