import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterComponent } from '../tester/tester.component';
import { CountedLettersComponent } from '../counted-letters/counted-letters.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TesterComponent, CountedLettersComponent],
  exports: [TesterComponent, CountedLettersComponent],
})
export class MyModuleModule {
  constructor() {}
}
