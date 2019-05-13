import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aggridapp';
  
  columnDefs = [
         {headerName: 'Id', field: 'id', sortable: true, filter: true},
		{headerName: 'Name', field: 'name', sortable: true, filter: true},
		{headerName: 'Language', field: 'language', sortable: true, filter: true},
		{headerName: 'Country', field: 'country', sortable: true, filter: true}
    ];

    rowData: any;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
        this.rowData = this.http.get('http://localhost:8080/aggrid/api/devices');
    }
}
