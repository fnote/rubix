import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-content-display-box',
	templateUrl: './content-display-box.component.html',
	styleUrls: ['./content-display-box.component.scss'],
})
export class ContentDisplayBoxComponent implements OnInit {
	@Input() public contentData: Object;
	@Input() public imageUrl: string;
	@Input() public title: string;
	@Input() public discription: string;
	@Input() public fotterDis: string;
	@Input() public actions: Array<number>;
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
