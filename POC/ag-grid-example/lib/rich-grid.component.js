"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var refData_1 = require('./refData');
// only import this if you are using the ag-Grid-Enterprise
require('ag-grid-enterprise/main');
var RichGridComponent = (function () {
    function RichGridComponent() {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = {};
        this.createRowData();
        this.createColumnDefs();
        this.showGrid = true;
    }
    RichGridComponent.prototype.createRowData = function () {
        var rowData = [], self = this;
        for (var i = 0; i < 1000; i++) {
            var countryData = refData_1.default.countries[i % refData_1.default.countries.length]; // {country: "Ireland", continent: "Europe", language: "English"}
            rowData.push({
                symbol: refData_1.default.symbols[i % refData_1.default.symbols.length],
                country: countryData.country,
                last: Math.round((Math.random() * 2 - 1) * 100),
                change: Math.round(Math.random() * 100000) / 100,
                bid: Math.round(Math.random() * 100000) / 100,
                dirty: true
            });
        }
        this.rowData = rowData;
        var updateInterval = 75;
        setInterval(function () {
            var ind, changeRatio = 4;
            for (var i = 0; i < self.rowData.length / changeRatio; i++) {
                ind = Math.round(Math.random() * (self.rowData.length - 1));
                self.rowData[ind].last = Math.round((Math.random() * 2 - 1) * 100);
                self.rowData[ind].bid = Math.round(Math.random() * 100000) / 100;
                self.rowData[ind].dirty = true;
            }
            // self.gridOptions.api.refreshView();
        }, updateInterval);
        var GuiUpdateInterval = 300;
        setInterval(function () {
            var updatedNodes = [];
            self.gridOptions.api.forEachNode(function (node) {
                var data = node.data;
                if (data.dirty) {
                    updatedNodes.push(node);
                    data.dirty = false;
                }
            });
            // now tell the grid it needs refresh all these rows
            self.gridOptions.api.refreshRows(updatedNodes);
            if (self.gridOptions.api.getSortModel().length > 0)
                self.gridOptions.api.setSortModel(self.gridOptions.api.getSortModel());
        }, updateInterval);
    };
    RichGridComponent.prototype.createColumnDefs = function () {
        this.columnDefs = [
            {
                headerName: "Symbol", field: "symbol",
                width: 150, pinned: true
            },
            {
                headerName: "Country", field: "country", width: 150,
            },
            {
                headerName: "Last", field: "last", width: 150,
                cellRenderer: negPosCellRenderer, pinned: true,
            },
            {
                headerName: "Chg.", field: "change", width: 150, filter: 'text'
            },
            {
                headerName: "Bid", field: "bid", width: 500, filter: 'text'
            }
        ];
    };
    RichGridComponent.prototype.calculateRowCount = function () {
        if (this.gridOptions.api && this.rowData) {
            var model = this.gridOptions.api.getModel();
            var totalRows = this.rowData.length;
            var processedRows = model.getRowCount();
            this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }
    };
    RichGridComponent.prototype.onModelUpdated = function () {
        console.log('onModelUpdated');
        this.calculateRowCount();
    };
    RichGridComponent.prototype.onReady = function () {
        console.log('onReady');
        this.calculateRowCount();
    };
    RichGridComponent.prototype.onCellClicked = function ($event) {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    };
    RichGridComponent.prototype.onCellValueChanged = function ($event) {
        console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
    };
    RichGridComponent.prototype.onCellDoubleClicked = function ($event) {
        console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    };
    RichGridComponent.prototype.onCellContextMenu = function ($event) {
        console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
    };
    RichGridComponent.prototype.onCellFocused = function ($event) {
        console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
    };
    RichGridComponent.prototype.onRowSelected = function ($event) {
        // taking out, as when we 'select all', it prints to much to the console!!
        // console.log('onRowSelected: ' + $event.node.data.name);
    };
    RichGridComponent.prototype.onSelectionChanged = function () {
        console.log('selectionChanged');
    };
    RichGridComponent.prototype.onBeforeFilterChanged = function () {
        console.log('beforeFilterChanged');
    };
    RichGridComponent.prototype.onAfterFilterChanged = function () {
        console.log('afterFilterChanged');
    };
    RichGridComponent.prototype.onFilterModified = function () {
        console.log('onFilterModified');
    };
    RichGridComponent.prototype.onBeforeSortChanged = function (a, b, c) {
        console.log('onBeforeSortChanged');
    };
    RichGridComponent.prototype.onAfterSortChanged = function (a, b, c) {
        console.log('onAfterSortChanged');
    };
    RichGridComponent.prototype.onVirtualRowRemoved = function ($event) {
        // because this event gets fired LOTS of times, we don't print it to the
        // console. if you want to see it, just uncomment out this line
        // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
    };
    RichGridComponent.prototype.onRowClicked = function ($event) {
        console.log('onRowClicked: ' + $event.node.data.symbol);
    };
    RichGridComponent.prototype.onQuickFilterChanged = function ($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    };
    // here we use one generic event to handle all the column type events.
    // the method just prints the event name
    RichGridComponent.prototype.onColumnEvent = function ($event) {
        console.log('onColumnEvent: ' + $event);
    };
    RichGridComponent = __decorate([
        core_1.Component({
            selector: 'rich-grid',
            templateUrl: 'app/rich-grid.component.html',
            styles: ['.toolbar button {margin: 2px; padding: 0px;}'],
        }), 
        __metadata('design:paramtypes', [])
    ], RichGridComponent);
    return RichGridComponent;
}());
exports.RichGridComponent = RichGridComponent;
function skillsCellRenderer(params) {
    var data = params.data;
    var skills = [];
    refData_1.default.IT_SKILLS.forEach(function (skill) {
        if (data && data.skills && data.skills[skill]) {
            skills.push('<img src="/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
        }
    });
    return skills.join(' ');
}
function countryCellRenderer(params) {
    var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='../images/flags/" + refData_1.default.COUNTRY_CODES[params.value] + ".png'>";
    return flag + " " + params.value;
}
function negPosCellRenderer(params) {
    var val = params.value;
    var cls = "green_back";
    if (val < 0) {
        cls = "red_back";
    }
    return "<div class='" + cls + "'>" + val + "</div>";
}
function createRandomPhoneNumber() {
    var result = '+';
    for (var i = 0; i < 12; i++) {
        result += Math.round(Math.random() * 10);
        if (i === 2 || i === 5 || i === 8) {
            result += ' ';
        }
    }
    return result;
}
function percentCellRenderer(params) {
    var value = params.value;
    var eDivPercentBar = document.createElement('div');
    eDivPercentBar.className = 'div-percent-bar';
    eDivPercentBar.style.width = value + '%';
    if (value < 20) {
        eDivPercentBar.style.backgroundColor = 'red';
    }
    else if (value < 60) {
        eDivPercentBar.style.backgroundColor = '#ff9900';
    }
    else {
        eDivPercentBar.style.backgroundColor = '#00A000';
    }
    var eValue = document.createElement('div');
    eValue.className = 'div-percent-value';
    eValue.innerHTML = value + '%';
    var eOuterDiv = document.createElement('div');
    eOuterDiv.className = 'div-outer-div';
    eOuterDiv.appendChild(eValue);
    eOuterDiv.appendChild(eDivPercentBar);
    return eOuterDiv;
}
//# sourceMappingURL=rich-grid.component.js.map