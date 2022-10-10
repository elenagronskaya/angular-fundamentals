import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input () placeholder: string = '';
  @Output() onSearch = new EventEmitter<string>();

  onSubmit(formData: any) {
    const searchFilter = formData['searchFilter']
    this.onSearch.emit(searchFilter)
  }
}
