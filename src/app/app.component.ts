import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

interface ParentUser {
  id: number;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'javid';

  users: User[] = [
    { id: 1, firstname: 'shota', lastname: 'rustaveli', age: 23 },
    { id: 2, firstname: 'ana', lastname: 'kalandadze', age: 17 },
    { id: 3, firstname: 'Emma', lastname: 'Williams', age: 19 },
  ];

  parentUsers: ParentUser[] = [
    { id: 1, firstname: 'Michael', lastname: 'Smith', dateOfBirth: '1995-04-12', phoneNumber: '2345678901', email: 'michael@example.com' },
    { id: 2, firstname: 'Sarah', lastname: 'Johnson', dateOfBirth: '2005-10-20', phoneNumber: '1234567890', email: 'sarah@example.com' },
  ];

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
    });
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser: User = {
        id: this.users.length + 1,
        firstname: this.userForm.value.firstname,
        lastname: this.userForm.value.lastname,
        age: new Date().getFullYear() - new Date(this.userForm.value.dateOfBirth).getFullYear(),
      };
      this.users.push(newUser);
      this.userForm.reset();
    }
  }

  displayUsers() {
    console.log("Array is displayed by Display service:", this.users);
  }
}