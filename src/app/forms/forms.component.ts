import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../modelo/Person';
import { CommonModule } from '@angular/common';

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

  register(){
    this.vetor.push(this.forms.value as Person); //cadastro no vetor
    this.forms.reset(); //limpeza dos inputs
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
    this.vetor[this.indice] = this.forms.value as Person;
    this.forms.reset();

    this.btnVisibility = true;
  }

  delete(){
    this.vetor.splice(this.indice, 1);
    this.forms.reset();

    this.btnVisibility = true;
  }

  cancel(){
    this.forms.reset();
    this.btnVisibility = true;
  }
}
