import {
	Component,
	OnInit,
	ViewChild
}
from '@angular/core';
import {
	HttpClient
}
from '@angular/common/http';
import {
	AgGridNg2
}
from 'ag-grid-angular';
import { HttpHeaders } from '@angular/common/http';

 @ Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	 @ ViewChild('agGrid')agGrid: AgGridNg2;

	title = 'Device List';
	
export const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

	columnDefs = [{
			headerName: 'Id',
			field: 'id',
			sortable: true,
			filter: true,
			checkboxSelection: true,
			resizable: true
		}, {
			headerName: 'Name',
			field: 'name',
			sortable: true,
			filter: true,
			editable: true,
			resizable: true
		}, {
			headerName: 'Language',
			field: 'language',
			sortable: true,
			filter: true,
			editable: true,
			resizable: true
		}, {
			headerName: 'Country',
			field: 'country',
			sortable: true,
			filter: true,
			editable: true,
			resizable: true
		}
	];

	rowData: any;

	private gridApi;
	

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.rowData = this.http.get('http://localhost:8080/aggrid/api/devices');
	}

	updateRows() {
		const selectedNodes = this.agGrid.api.getSelectedNodes();
		console.log(selectedNodes);
		const selectedData = selectedNodes.map(node => node.data);
		console.log(selectedData);
		
		return this.http.post('http://localhost:8080/aggrid/api/devices', selectedData, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
	}

	onAddRow() {
		var newItem = createNewRowData();
		var res = this.gridApi.updateRowData({
				add: [newItem]
			});
		printResult(res);
	}

	onRemoveSelected() {
		var selectedData = this.gridApi.getSelectedRows();
		var res = this.gridApi.updateRowData({
				remove: selectedData
			});
		printResult(res);
	}

	autoGroupColumnDef = {
		headerName: 'Country',
		field: 'country',
		cellRenderer: 'agGroupCellRenderer',
		cellRendererParams: {
			checkbox: true
		}
	};

	onGridReady(params) {
		this.gridApi = params.api;
	}

}

function printResult(res) {
	console.log("---------------------------------------");
	if (res.add) {
		res.add.forEach(function (rowNode) {
			console.log("Added Row Node", rowNode);
		});
	}
	if (res.remove) {
		res.remove.forEach(function (rowNode) {
			console.log("Removed Row Node", rowNode);
		});
	}
}

function createNewRowData() {
	var newData = {
		id: "",
		name: "",
		language: "",
		country: ""
	};
	return newData;
}