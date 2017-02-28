import {Component} from '@angular/core';
import {GridOptions} from 'ag-grid/main';
import ProficiencyFilter from './proficiencyFilter';
import SkillFilter from './skillFilter';
import RefData from './refData';

// only import this if you are using the ag-Grid-Enterprise
import 'ag-grid-enterprise/main';

@Component({
    selector: 'rich-grid',
    templateUrl: 'app/rich-grid.component.html',
    styles: ['.toolbar button {margin: 2px; padding: 0px;}'],
})
export class RichGridComponent {

    private gridOptions: GridOptions;
    private showGrid: boolean;
    private rowData: any[];
    private columnDefs: any[];
    private rowCount: string;

    constructor() {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.createRowData();
        this.createColumnDefs();
        this.showGrid = true;
    }

    private createRowData() {
        const rowData: any[] = [] , self = this;

        for (let i = 0; i < 1000; i++) {
            const countryData = RefData.countries[i % RefData.countries.length];
            rowData.push({
                symbol: RefData.symbols[i % RefData.symbols.length],
                country: countryData.country,
                last: Math.round((Math.random() * 2 - 1) * 100),
                change: Math.round(Math.random() * 100000) / 100,
                bid: Math.round(Math.random() * 100000) / 100,
                dirty: true
            });
        }

        this.rowData = rowData;
        const  updateInterval = 75;
        setInterval(function(){// data updater function
            let ind;
            const changeRatio = 4;
            for (let i = 0; i < self.rowData.length / changeRatio; i++) {
                ind = Math.round(Math.random() * (self.rowData.length - 1));
                self.rowData[ind].last = Math.round((Math.random() * 2 - 1) * 100);
                self.rowData[ind].bid = Math.round(Math.random() * 100000) / 100;
                self.rowData[ind].dirty = true;

            }
           // self.gridOptions.api.refreshView();

        }, updateInterval);

        const GuiUpdateInterval = 300;
        setInterval(function(){// GUI updater function
            const updatedNodes = [];
            self.gridOptions.api.forEachNode( function(node) {
                const data = node.data;
                if (data.dirty) {
                    updatedNodes.push(node);
                    data.dirty = false;
                }
            });
            // now tell the grid it needs refresh all these rows
            self.gridOptions.api.refreshRows(updatedNodes);
            if (self.gridOptions.api.getSortModel().length > 0) {
                self.gridOptions.api.setSortModel( self.gridOptions.api.getSortModel());
            }
        }, updateInterval);
    }

    private createColumnDefs() {
        this.columnDefs = [
            {
                headerName: 'Symbol', field: 'symbol',
                width: 150, pinned: true
            },
            {
                headerName: 'Country', field: 'country', width: 150,
                // cellRenderer: countryCellRenderer, pinned: true,
                // filterParams: {cellRenderer: countryCellRenderer, cellHeight: 20}
            },
            {
                headerName: 'Last', field: 'last', width: 150,
                cellRenderer: negPosCellRenderer, pinned: true,
            },
            {
                headerName: 'Chg.', field: 'change', width: 150, filter: 'text'
            },
            {
                headerName: 'Bid', field: 'bid', width: 500, filter: 'text'
            }
        ];
    }

    private calculateRowCount() {
        if (this.gridOptions.api && this.rowData) {
            const model = this.gridOptions.api.getModel();
            const totalRows = this.rowData.length;
            const processedRows = model.getRowCount();
            this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
    }

    private onModelUpdated() {
        console.log('onModelUpdated');
        this.calculateRowCount();
    }

    private onReady() {
        console.log('onReady');
        this.calculateRowCount();
    }

    private onCellClicked($event) {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellValueChanged($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    }

    private onCellDoubleClicked($event) {
        console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellContextMenu($event) {
        console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    }

    private onCellFocused($event) {
        console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    }

    private onRowSelected($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        // console.log('onRowSelected: ' + $event.node.data.name);
    }

    private onSelectionChanged() {
        console.log('selectionChanged');
    }

    private onBeforeFilterChanged() {
        console.log('beforeFilterChanged');
    }

    private onAfterFilterChanged() {
        console.log('afterFilterChanged');
    }

    private onFilterModified() {
        console.log('onFilterModified');
    }

    private onBeforeSortChanged(a, b, c) {
        console.log('onBeforeSortChanged');
    }

    private onAfterSortChanged(a, b, c) {
        console.log('onAfterSortChanged');
    }

    private onVirtualRowRemoved($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    }

    private onRowClicked($event) {
        console.log('onRowClicked: ' + $event.node.data.symbol);
    }

    private onQuickFilterChanged($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    }

    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    private onColumnEvent($event) {
        console.log('onColumnEvent: ' + $event);
    }

}

function skillsCellRenderer(params) {
    const data = params.data;
    const skills = [];
    RefData.IT_SKILLS.forEach(function (skill) {
        if (data && data.skills && data.skills[skill]) {
            skills.push('<img src="/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
        }
    });
    return skills.join(' ');
}

function countryCellRenderer(params) {
    const flag = '<img border=\'0\' width=\'15\' height=\'10\' style=\'margin-bottom: 2px\' src=\'../images/flags/' +
    RefData.COUNTRY_CODES[params.value] + '.png\'>';
    return flag + ' ' + params.value;
}

function negPosCellRenderer(params) {
    const val = params.value;
    let cls = 'green_back';
   if (val < 0) {
       cls =  'red_back';
   }
    return '<div class=\'' + cls + '\'>' + val + '</div>';
}

function createRandomPhoneNumber() {
    let result = '+';
    for (let i = 0; i < 12; i++) {
        result += Math.round(Math.random() * 10);
        if (i === 2 || i === 5 || i === 8) {
            result += ' ';
        }
    }
    return result;
}

function percentCellRenderer(params) {
    const value = params.value;
    const eDivPercentBar = document.createElement('div');
    eDivPercentBar.className = 'div-percent-bar';
    eDivPercentBar.style.width = value + '%';
    if (value < 20) {
        eDivPercentBar.style.backgroundColor = 'red';
    } else if (value < 60) {
        eDivPercentBar.style.backgroundColor = '#ff9900';
    } else {
        eDivPercentBar.style.backgroundColor = '#00A000';
    }

    const eValue = document.createElement('div');
    eValue.className = 'div-percent-value';
    eValue.innerHTML = value + '%';

    const eOuterDiv = document.createElement('div');
    eOuterDiv.className = 'div-outer-div';
    eOuterDiv.appendChild(eValue);
    eOuterDiv.appendChild(eDivPercentBar);

    return eOuterDiv;
}
