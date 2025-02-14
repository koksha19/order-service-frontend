import { Component, computed, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Delivery } from '../../../models/delivery.model';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-edit',
  imports: [FormsModule, MatCheckbox],
  templateUrl: './product-edit.component.html',
  standalone: true,
  styleUrl: '../../auth/signup/signup.component.css',
})
export class ProductEditComponent {
  readonly delivery = signal<Delivery>({
    name: 'Select all',
    price: 0,
    checked: false,
    options: [
      {name: 'Standard', price: 50, checked: false},
      {name: 'Express', price: 70, checked: false},
      {name: 'Overnight', price: 100, checked: false},
    ],
  });

  readonly partiallyComplete = computed(() => {
    const delivery = this.delivery();
    if (!delivery.options) {
      return false;
    }
    return delivery.options.some(d => d.checked) && !delivery.options.every(d => d.checked);
  });

  update(checked: boolean, index?: number) {
    this.delivery.update(delivery => {
      if (index === undefined) {
        delivery.checked = checked;
        delivery.options?.forEach(d => (d.checked = checked));
      } else {
        delivery.options![index].checked = checked;
        delivery.checked = delivery.options?.every(t => t.checked) ?? true;
      }
      return {...delivery};
    });
  }
}
