import { Component } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent {
  cities = [
    { value: '0', viewValue: 'Minsk' },
    { value: '1', viewValue: 'Vitebsk' },
    { value: '2', viewValue: 'Grodno' },
    { value: '3', viewValue: 'Gomel' },
    { value: '4', viewValue: 'Mogilev' },
    { value: '5', viewValue: 'Brest' },
  ];
  selected = { value: '0', viewValue: 'Minsk' };
}
