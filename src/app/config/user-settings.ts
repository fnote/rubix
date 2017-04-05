import { Languages } from '../constants/enums/languages.enum';
import { Themes } from '../constants/enums/themes.enum';

export const userSettings = {

	presentation: {
		defaultTheme: Themes.Dark,
		defaultLanguage: Languages.EN,
		defaultFontSize: 12, // TODO: [Amila] Discuss this with Dinushka
	},

	marketData: {
		defaultDecimalPlaces: 2,
		defaultNumberInitializer: -1,
		defaultStringInitializer: '-',
		thousandSeperator: {
			applyThousandSeperator: true,
			thousandSeperator: ',',
		},

	},

	tradeData: {
		defaultDecimalPlaces: 2,
		defaultNumberInitializer: -1,
		defaultStringInitializer: '-',
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
