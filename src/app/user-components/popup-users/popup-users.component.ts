import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user'; // Import the User model
import { UserService } from 'src/app/services/user_service';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-popup-users',
  templateUrl: './popup-users.component.html',
  styleUrls: ['./popup-users.component.css']
})
export class PopupUsersComponent implements OnInit {
  userForm: FormGroup;
  isEditing = false; // Variable to track if the form is used for editing
  roles = Object.keys(Role);
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,


  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password :['',Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.user.id) {
      this.isEditing = true;
      const user = this.data.user as User;
      console.log("password" + user.password)
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password : user.password
      });
    }
  }

  submit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const payload = {
        id: this.data.user.id, // Include the id of the user
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        role: formValue.role,
        password : formValue.password
      };
      console.log('Payload:', payload); // Log the payload
      this.dialogRef.close(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
