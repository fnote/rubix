import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
	selector: 'app-basic-table',
	templateUrl: './basic-table.component.html',
	styleUrls: ['./basic-table.component.scss'],
})

export class BasicTableComponent implements OnInit {

	@Output() public actionEmmiter: EventEmitter<object> = new EventEmitter();

	@Input() public tableContent: {
		headerContent: Array<string>,
		contentBody: Array<Object>,
	};

	constructor() {
		// code here
	}

	public ngOnInit(): void {
		// code here
	}

	public onSpecialActionCliked(event: Event, content: Object, subContent: Object): void {
		event.stopPropagation();
		this.actionEmmiter.emit(content);
	}

}
