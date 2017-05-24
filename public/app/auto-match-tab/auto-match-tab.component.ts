import { Component, OnInit } from '@angular/core';
import { PagedArrayCollection, DateCell } from 'novo-elements';
import { AutoMatchTabService } from './auto-match-tab.service';

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
  // matched: TableConfig;
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
  readOnlyConfig: any = {
    paging: {
      current: 1,
      itemsPerPage: 10
    },
    sorting: true,
    filtering: true,
    ordering: true,
    resizing: true
  };

  constructor(private service: AutoMatchTabService){}

  ngOnInit() {
    const columns = [
      { title: 'Name', name: 'name', ordering: true, type: 'link', filtering: true },
      { title: 'Position', name: 'occupation', ordering: true, filtering: true },
      { title: 'Hourly Rate', name: 'payRate', ordering: true, filtering: true, renderer: (object) => `$ ${Number(object.payRate).toFixed(2)}` },
      {
        title: 'Shift Date',
        name: 'shiftDate',
        type: 'date',
        renderer: DateCell,
        ordering: true,
        filtering: true,
        range: true
      }
    ];

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

    this.service.getNotified().subscribe((evt) => {
      this.notified.rows = new PagedArrayCollection<any>(evt);
    });
    this.service.getInterested().subscribe((evt) => {
      this.interested.rows = new PagedArrayCollection<any>(evt);
    });
    this.service.getRejected().subscribe((evt) => {
      this.rejected.rows = new PagedArrayCollection<any>(evt);
    });
    this.service.getConfirmed().subscribe((evt) => {
      this.confirmed.rows = new PagedArrayCollection<any>(evt);
    });
  }

  // notify(selected) {
  //   for (const record of selected) {
  //     record.status = 'Notified';
  //     this.notified.rows.addItem(record);
  //     // this.matched.rows.removeItem(record);
  //     this.service.notify(selected);
  //   }
  // }

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
      this.service.confirm(selected);
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
