import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-disp-box',
	templateUrl: './disp-box.component.html',
	// styleUrls: ['./disp-box.component.scss']
})
export class DispBoxComponent {
	@Input() public title: string;
	@Input() public dispValue: string;
	@Input() public bgClass: string;
}
