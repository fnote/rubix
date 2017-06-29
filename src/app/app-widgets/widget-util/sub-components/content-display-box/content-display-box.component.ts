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
	@Input() public headerClass: string;
	@Input() public bodyClass: string;
	@Input() public description: string;
	@Input() public fullDescription: string;
	@Input() public footerDes: string;
	@Input() public actions: Array<number>;
	@Input() public content: Object;
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
