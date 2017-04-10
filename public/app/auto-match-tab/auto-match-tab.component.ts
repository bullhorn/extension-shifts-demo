import { Component, OnInit } from '@angular/core';
import { PagedArrayCollection } from 'novo-elements';
import { TableData } from './auto-match-tab.data';

interface TableConfig {
  columns: Array<any>;
  rows: PagedArrayCollection<any>;
}

@Component({
  selector: 'app-auto-match-tab',
  templateUrl: './auto-match-tab.component.html',
  styleUrls: ['./auto-match-tab.component.scss']
})
export class AutoMatchTabComponent implements OnInit {
  matched: TableConfig;
  notified: TableConfig;
  interested: TableConfig;
  rejected: TableConfig;
  confirmed: TableConfig;

  config: any = {
    paging: {
      current: 1,
      itemsPerPage: 10
    },
    sorting: true,
    filtering: true,
    ordering: true,
    resizing: true,
    selectAllEnabled: true,
    rowSelectionStyle: 'checkbox'
  };

  constructor() { }

  ngOnInit() {
    const columns = [
      { title: 'Name', name: 'name', ordering: true, type: 'link', filtering: true },
      { title: 'Position', name: 'position', ordering: true, filtering: true },
      {
        title: 'Status',
        name: 'status',
        options: ['New Lead', 'Active', 'Archived'],
        ordering: true,
        multiple: true,
        filtering: true
      }
    ];
    this.matched = {
      columns: columns.slice(),
      rows: new PagedArrayCollection<any>(TableData.slice())
    };
    this.notified = {
      columns: columns.slice(),
      rows: new PagedArrayCollection<any>()
    };
    this.interested = {
      columns: columns.slice(),
      rows: new PagedArrayCollection<any>()
    };
    this.rejected = {
      columns: columns.slice(),
      rows: new PagedArrayCollection<any>()
    };
    this.confirmed = {
      columns: columns.slice(),
      rows: new PagedArrayCollection<any>()
    };
  }

  singleAction() {
    window.alert('HI!');
  }

  notify(selected) {
    for (const record of selected) {
      record.status = 'Notified';
      this.notified.rows.addItem(record);
      this.matched.rows.removeItem(record);
    }
  }

  remind(selected) {
    for (const record of selected) {
      record.status = 'Interested';
      this.interested.rows.addItem(record);
      this.notified.rows.removeItem(record);
    }
  }

  confirm(selected) {
    for (const record of selected) {
      record.status = 'Confirmed';
      this.confirmed.rows.addItem(record);
      this.interested.rows.removeItem(record);
    }
  }

  reject(selected) {
    for (const record of selected) {
      record.status = 'Rejected';
      this.rejected.rows.addItem(record);
      this.interested.rows.removeItem(record);
    }
  }

}
