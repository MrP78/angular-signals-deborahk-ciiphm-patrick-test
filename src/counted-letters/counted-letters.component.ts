import { Component, computed, OnInit } from '@angular/core';
import { PassingService } from '../passing.service';

@Component({
  selector: 'app-counted-letters',
  templateUrl: './counted-letters.component.html',
  styleUrls: ['./counted-letters.component.css'],
})
export class CountedLettersComponent implements OnInit {
  constructor(private passing: PassingService) {}
  count = computed(() => this.passing.name().length);
  ngOnInit() {}
}
