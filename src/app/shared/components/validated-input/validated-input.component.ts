import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-validated-input',
  templateUrl: './validated-input.component.html',
  styleUrls: ['./validated-input.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, CommonModule],
})
export class ValidatedInputComponent{
  @Input() placeHolder?: string;
  @Input() inputType: string = 'text';
  @Input() control!: FormControl;

  constructor() {}


  showError() {
    const { touched, dirty, errors } = this.control;
    return touched && dirty && errors;
  }

  validationErrorsKeys() {
    return Object.keys(this.control.errors || []);
  }
}
