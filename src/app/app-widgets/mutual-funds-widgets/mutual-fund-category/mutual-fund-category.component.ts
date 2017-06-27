import { Component/**, OnInit */ } from '@angular/core';

@Component({
	selector: 'app-mutual-fund-category',
	templateUrl: './mutual-fund-category.component.html',
	styleUrls: ['./mutual-fund-category.component.scss'],
})
export class MutualFundCategoryComponent { // } implements OnInit {

	public contentData = [
		{ imageUrl: 'img/img_one.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_two.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_three.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_four.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
		{ imageUrl: 'img/img_five.png', title: 'Growth Strategy', discription: 'For Aggressive investors who wish to Sharia Compliant mutual funds' },
	];

	// constructor() { }

	// ngOnInit() {
	// }

}
