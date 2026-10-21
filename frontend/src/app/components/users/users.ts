import { Component, inject, signal } from '@angular/core';
import { ApiClient } from '../../services/api-client';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../../interfaces/user-model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-users',
  styleUrl: './users.css',
  templateUrl: './users.html',
})
export class Users {
  private apiClient = inject(ApiClient);
  private fb = inject(FormBuilder);

  users = signal<UserModel[]>([]);
  loading = false;
  errorMessage = '';

  userForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: [''],
    age: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    this.loading = true;
    this.errorMessage = '';

    this.apiClient.getUsers().subscribe({
      next: (users: any) => {
        console.log(users);

        this.users.set(users);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar los usuarios.';
        this.loading = false;
      },
    });
  }

  addUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const newUser: UserModel = this.userForm.getRawValue();

    this.apiClient.createUser(newUser).subscribe({
      next: () => {
        this.userForm.reset({
          firstName: '',
          lastName: '',
          age: 18,
        });

        this.loadUsers();
      },
      error: () => {
        this.errorMessage = 'No se pudo agregar el usuario.';
      },
    });
  }

  deleteUser(id: string): void {
    console.log(id);
    this.apiClient.deleteUser(id).subscribe({
      next: () => {
        this.users.update((users) => users.filter((current) => current._id !== id));
      },
      error: (err) => {
        console.log(err);

        this.errorMessage = 'No se pudo eliminar el usuario.';
      },
    });
  }
}
