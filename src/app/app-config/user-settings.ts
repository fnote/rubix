import { Languages } from '../app-constants/enums/languages.enum';
import { Themes } from '../app-constants/enums/themes.enum';

export const userSettings = {

	presentation: {
		defaultTheme: Themes.Light,
		defaultLanguage: Languages.EN,
		defaultFontSize: 12, // TODO: [Amila] Discuss this with Dinushka
	},

	marketData: {
		defaultDecimalPlaces: 2,
		defaultPercentageDecimalPlaces: 2,
		defaultStringInitializer: '-',
		defaultNumberInitializer: {
			minusOneInitializer: -1,
			zeroInitializer: 0,
		},
		thousandSeperator: {
			applyThousandSeperator: true,
			thousandSeperator: ',',
		},
	},

	tradeData: {
		defaultDecimalPlaces: 2,
		defaultStringInitializer: '-',
		defaultNumberInitializer: {
			minusOneInitializer: -1,
			zeroInitializer: 0,
		},
		thousandSeperator: {
			applyThousandSeperator: true,
			thousandSeperator: ',',
		},
	},

	dateTime: {
		defaultGMTOffset: 4,
		defaultDateFormat: 'YYYY/MM/DD',
		defaultTimeFormat: 'HH:MM',
		defaultDateTimeFormat: 'YYYY/MM/DD HH:MM',
	},
};
