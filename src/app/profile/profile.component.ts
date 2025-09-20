import { Component, OnInit, Input } from '@angular/core';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  @Input() signOutFn: any;
  userAttributes: any = {};
  loading = true;

  columnDefs: ColDef[] = [
    { field: 'employee', headerName: 'Employee', sortable: true, filter: true },
    { field: 'skill', headerName: 'Skill', sortable: true, filter: true },
    { field: 'currentLevel', headerName: 'Current Level', sortable: true, filter: true },
    { field: 'targetLevel', headerName: 'Target Level', sortable: true, filter: true },
    { field: 'actions', headerName: 'Actions', sortable: false, filter: false }
  ];

  rowData: any[] = [];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  };

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

  async handleSignOut() {
    if (this.signOutFn) {
      await this.signOutFn();
    }
  }
}