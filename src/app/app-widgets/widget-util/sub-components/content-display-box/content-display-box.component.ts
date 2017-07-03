import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-content-display-box',
	templateUrl: './content-display-box.component.html',
})
export class ContentDisplayBoxComponent {
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

	public onActionBubble(event: Event, sampleString: string): void {
		event.stopPropagation();
		this.testEventEmitter.next(sampleString);
	}
}
