import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../modelo/Person';
import { CommonModule } from '@angular/common';

import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})

export class FormsComponent {

  forms = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  
  btnVisibility:boolean = true; // visibility btns

  vetor:Person[] = [];
  indice:number = -1;

  constructor(private sessionStorageService: SessionStorageService){
    this.loadFromSessionStorage();
  }


  register(){
    if (this.forms.valid){
      this.vetor.push(this.forms.value as Person); //cadastro no vetor
      this.forms.reset(); //limpeza dos inputs

      this.saveToSessionStorage();
    } 
  }

  
  select(indice:number){
    this.indice = indice;

    this.forms.setValue({
      name: this.vetor[indice].name,
      age: this.vetor[indice].age,
      city: this.vetor[indice].city
    })
    this.btnVisibility = false;
  }


  update(){
    if (this.forms.valid){
      this.vetor[this.indice] = this.forms.value as Person;
      this.forms.reset();
  
      this.btnVisibility = true;

      this.saveToSessionStorage();
    }
  }

  delete(){
    this.vetor.splice(this.indice, 1);
    this.forms.reset();

    this.btnVisibility = true;

    this.saveToSessionStorage();
  }

  cancel(){
    this.forms.reset();
    this.btnVisibility = true;
  }

  //método para salvar o vetor no session storage
  saveToSessionStorage(){
    this.sessionStorageService.setItem('vetor', this.vetor);
  }

  //método para carregar o vetor do session storage
  loadFromSessionStorage(){
    const storedVetor = this.sessionStorageService.getItem('vetor');

    if (storedVetor){
      this.vetor = storedVetor;
    }
  }
}
