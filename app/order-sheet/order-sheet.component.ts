import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';
import { CustomValidator } from '../shared/custom-validator';
@Component({
  selector: 'app-order-sheet',
  templateUrl: './order-sheet.component.html',
  styleUrls: ['./order-sheet.component.scss']
})
export class OrderSheetComponent implements OnInit {
  orderSheetsForm: FormGroup;
  weirdRequestsControl: FormArray;
  showWelcomeMessage = false;

  customerNameControl;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    this.orderSheetsForm = this.formBuilder.group(
      {
        customerName: this.formBuilder.control(null, [
          Validators.required,
          Validators.minLength(4)
        ]),
        size: this.formBuilder.control(null),
        bread: this.formBuilder.control(null),
        specialtySandwich: this.formBuilder.control(null),
        // specialtySandwich: this.formBuilder.control('Cordon Bleu'),
        weirdRequests: this.formBuilder.array([this.formBuilder.control(null)]),
        othernotes: this.formBuilder.control(null),
        meats: this.formBuilder.group({
          chicken: this.formBuilder.control(null),
          turcky: this.formBuilder.control(null),
          beef: this.formBuilder.control(null)
        }),
        cheeses: this.formBuilder.group({
          cheedar: this.formBuilder.control(null),
          brie: this.formBuilder.control(null),
          vash: this.formBuilder.control(null)
        }),
        veggiesAndSuch: this.formBuilder.group({
          carrot: this.formBuilder.control(null),
          potato: this.formBuilder.control(null),
          tomato: this.formBuilder.control(null)
        })
      },
      {
        validator: CustomValidator.requiredWhen('bread', 'specialtySandwich')
      }
    );
    this.weirdRequestsControl = this.orderSheetsForm.get(
      'weirdRequests'
    ) as FormArray;

    this.customerNameControl = this.orderSheetsForm.get('customerName');
    this.customerNameControl.valueChanges.subscribe(value => {
      this.showWelcomeMessage = value && value.toLowerCase().trim() === 'rich';
    });
  }

  onAddWeirdRequests() {
    this.weirdRequestsControl.push(this.formBuilder.control(null));
  }

  onRemoveWeirdRequest(index) {
    this.weirdRequestsControl.removeAt(index);
  }

  OnRecetForm() {
    this.orderSheetsForm.reset({
      customerName: 'Default Value on Reset'
    });
  }

  onSubmitForm() {
    console.log(this.orderSheetsForm.value);
  }
}
