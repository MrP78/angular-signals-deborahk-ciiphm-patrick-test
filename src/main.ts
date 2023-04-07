import 'zone.js/dist/zone';
import { Component, computed, effect, NgModule, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PassingService } from './passing.service';
import { TesterComponent } from './tester/tester.component';
import { MyModuleModule } from './my-module/my-module.module';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule, MyModuleModule],
  template: `
    <h1>{{name()}}</h1>
      <select
        [ngModel]="quantity()"
        (change)="onQuantitySelected($any($event.target).value)">
        <option disabled value="">--Select a quantity--</option>
        <option *ngFor="let q of qtyAvailable()">{{ q }}</option>
      </select>
      <div>Vehicle: {{ selectedVehicle().name}}</div>
      <div>Price: {{ selectedVehicle().price | number: '1.2-2'}}</div>
      <div style="font-weight: bold" [style.color]="color()">Total: {{ exPrice()  | number: '1.2-2' }}</div>

      <input value="{{name()}}" (change)="nameChange($any($event.target).value)"/>
      <app-tester></app-tester>
      <app-counted-letters/>
  `,
})
export class App {
  name = computed(() => this.passing.name());
  quantity = signal<number>(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedVehicle = signal<Vehicle>({ id: 1, name: 'AT-AT', price: 10000 });

  vehicles = signal<Vehicle[]>([]);

  exPrice = computed(() => this.selectedVehicle().price * this.quantity());
  color = computed(() => (this.exPrice() > 50000 ? 'green' : 'blue'));

  constructor(private passing: PassingService) {
    console.log(this.quantity());

    // Two for one sale
    this.quantity.update((qty) => qty * 2);

    // Interstellar price increase
    this.selectedVehicle.mutate((v) => (v.price = v.price + v.price * 0.2));

    // Add selected vehicle to array
    this.vehicles.mutate((v) => v.push(this.selectedVehicle()));

    // Example of an effect
    effect(() => console.log(JSON.stringify(this.vehicles())));
  }

  // Example of a declarative effect
  qtyEff = effect(() => console.log('Latest quantity:', this.quantity()));

  onQuantitySelected(qty: number) {
    this.quantity.set(qty);

    // Does not "emit" values, rather updates the value in the "box"
    // this.quantity.set(5);
    // this.quantity.set(42);

    // Add the vehicle to the array again ... to see the effect execute
    //this.vehicles.mutate(v => v.push(this.selectedVehicle()))
  }
  nameChange(newname: string) {
    this.passing.name.set(newname);
  }
}

export interface Vehicle {
  id: number;
  name: string;
  price: number;
}

bootstrapApplication(App, { providers: [{ provide: PassingService }] });
