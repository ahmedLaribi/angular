import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css'
})
export class ReactiveForm {

  
  // Formulaire de connexion
  form = new FormGroup({
    login: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  // Formulaire d'inscription
  formUser = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    cin: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{8}$/)] }),
    tel: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{8}$/)] }),
    adresse: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
  });

  // Raccourcis : connexion
  get login() { return this.form.controls.login; }
  get password() { return this.form.controls.password; }

  // Raccourcis : inscription
  get name() { return this.formUser.controls.name; }
  get email() { return this.formUser.controls.email; }
  get cin() { return this.formUser.controls.cin; }
  get tel() { return this.formUser.controls.tel; }
  get adresse() { return this.formUser.controls.adresse; }

  save() {
    if (this.form.invalid) return;
    console.log('Connexion :', this.form.getRawValue());
  }

  saveUser() {
    if (this.formUser.invalid) return;
    console.log('Utilisateur :', this.formUser.getRawValue());
  }
}