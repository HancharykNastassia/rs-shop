import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ordered-popup',
  templateUrl: './ordered-popup.component.html',
  styleUrls: ['./ordered-popup.component.scss']
})
export class OrderedPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

}
