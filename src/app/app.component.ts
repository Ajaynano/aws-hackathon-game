import { Component, ChangeDetectorRef } from '@angular/core';
import { updateUserAttributes, fetchUserAttributes } from 'aws-amplify/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'hello-world';
  isEditingName = false;
  newName = '';
  currentUser: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

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

  editName(currentName: string) {
    this.isEditingName = true;
    this.newName = currentName || '';
  }

  onUserChange(user: any) {
    this.currentUser = user;
  }

  async saveName() {
    if (!this.newName.trim()) {
      alert('Please enter a valid name');
      return;
    }

    try {
      console.log('Updating name to:', this.newName);
      
      const result = await updateUserAttributes({
        userAttributes: {
          'name': this.newName.trim()
        }
      });
      
      console.log('Update result:', result);
      
      // Refresh user attributes
      const updatedAttributes = await fetchUserAttributes();
      console.log('Updated attributes:', updatedAttributes);
      
      if (this.currentUser) {
        this.currentUser.attributes = updatedAttributes;
      }
      
      this.isEditingName = false;
      this.cdr.detectChanges();
      
      alert('Name updated successfully!');
    } catch (error) {
      console.error('Error updating name:', error);
      alert('Failed to update name: ' + error);
    }
  }

  cancelEdit() {
    this.isEditingName = false;
    this.newName = '';
  }
}
