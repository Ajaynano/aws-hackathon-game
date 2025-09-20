import { Component, OnInit } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  userAttributes: any = {};
  loading = true;

  async ngOnInit() {
    await this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.userAttributes = await fetchUserAttributes();
      this.loading = false;
    } catch (error) {
      console.error('Error loading user profile:', error);
      this.loading = false;
    }
  }
}