import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-content-display-box',
	templateUrl: './content-display-box.component.html',
	styleUrls: ['./content-display-box.component.scss'],
})
export class ContentDisplayBoxComponent implements OnInit {

	@Output() public testEventEmitter: EventEmitter<string> = new EventEmitter();

	constructor() {
		// code
	}

	public ngOnInit(): void {
		// code
	}

	public onActionBubble(event: Event, sampleString: string): void {
		event.stopPropagation();
		this.testEventEmitter.next(sampleString);
	}
}
