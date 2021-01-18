import {Component, Input, OnInit} from '@angular/core';
import {Hit} from '../../model/Hit';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input('value') $value!: Subject<Hit[]>;
  value: Hit[] = []

  ngOnInit() {
    this.$value.subscribe(newValues => {
      this.value = newValues;
      console.log(this.value);
    })
  }
}
