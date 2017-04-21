export const appLayout = {
	path: 'primary-layout-one',
	model: [
		{
			model: [
				{
					title: 'Side Bar',
					path: 'side-bar',
					outlet: 'outlet1',
				},
			],
		},
		{
			model: [
				{
					title: 'First Tab',
					path: 'secondary-layout-two',
					outlet: 'outlet2',
					model: [
						{
							path: 'detail-quote',
							outlet: 'outlet1',
							args: ['TDWL', '1090'],
						},
					],
				},
				{
					title: 'Second Tab',
					path: 'secondary-layout-one',
					outlet: 'outlet2',
					model: [
						{
							path: 'detail-quote',
							outlet: 'outlet1',
							args: ['TDWL', '1010'],
						},
						{
							path: 'detail-quote',
							outlet: 'outlet2',
							args: ['DFM', 'EMAAR'],
						},
						{
							path: 'detail-quote',
							outlet: 'outlet3',
							args: ['DFM', 'DIC'],
						},
						{
							path: 'time-and-sales',
							outlet: 'outlet4',
							args: ['TDWL', '1090'],
						},
					],
				},
				{
					title: 'Third Tab',
					path: 'secondary-layout-one',
					outlet: 'outlet2',
					model: [
						{
							path: 'chart',
							outlet: 'outlet1',
						},
						{
							path: 'chart',
							outlet: 'outlet2',
						},
						{
							path: 'chart',
							outlet: 'outlet3',
						},
						{
							path: 'chart',
							outlet: 'outlet4',
						},
					],
				},
			],
		},
	],
};
