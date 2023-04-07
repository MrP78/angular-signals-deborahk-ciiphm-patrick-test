import { Component, computed, OnInit } from '@angular/core';
import { PassingService } from '../passing.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css'],
})
export class TesterComponent implements OnInit {
  constructor(private passing: PassingService) {}
  name = computed(() => this.passing.name() + ' Title');
  ngOnInit() {}
}
