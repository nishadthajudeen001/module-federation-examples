import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddUser } from '@xpo-lm/ng-mfshared';
import { User } from '@xpo-lm/ng-mfshared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  angForm: FormGroup;

  ngOnInit(): void {}

  constructor(private fb: FormBuilder, private store: Store) {
    this.angForm = this.createForm();
  }

  /**
   * Initialize the form
   */
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  /**
   * Handle the add user when the 'Create User' button is clicked
   * @param name: user's name
   * @param email: user's email
   */
  addUser(name: string, email: string): void {
    this.store.dispatch(new AddUser({ name, email } as User));
  }

  /**
   * Get the users for unit testing purposes
   */
  getUsers(): User[] {
    return this.store.selectSnapshot<User[]>((state) => state.users.users);
  }
}
