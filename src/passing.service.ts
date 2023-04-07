import { Injectable, signal, effect } from '@angular/core';

@Injectable()
export class PassingService {
  constructor() {
    effect(() => console.log(`New Name: ${this.name()}`));
  }

  public name = signal<string>('wiz');
}
