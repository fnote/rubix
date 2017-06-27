import { Injectable } from '@angular/core';
import { LogLevels } from '../app-constants/enums/log-levels.enum';
import { environment } from '../../environments/environment';

@Injectable()
export class LoggerService {

	private loggerUrl = 'logger';
	private lastSentIndex = 0;
	private isRequestInProgress = false;
	private isPeriodicUpdateStarted = false;
	private systemLogLevel = environment.appLogLevel;
	private serverLogLevel = environment.serverLogLevel;

	public logError (logEntry: string, module: string, logEvent: any = { defult: 'no event object provided' }): void {
		this.amendLog(logEntry, logEvent, LogLevels.LogError, module);
	}

	public logWarning (logEntry: string, module: string, logEvent: any = { defult: 'no event object provided' }): void {
		this.amendLog(logEntry, logEvent, LogLevels.LogWarning, module);
	}

	public logInfo (logEntry: string, module: string, logEvent: any = { defult: 'no event object provided' }): void {
		this.amendLog(logEntry, logEvent, LogLevels.LogInfo, module);
	}

	public logDebug (logEntry: string, module: string, logEvent: any = { defult: 'no event object provided' }): void {
		this.amendLog(logEntry, logEvent, LogLevels.LogDebug, module);
	}

	public LogData (logEntry: string, module: string, logEvent: any = { defult: 'no event object provided' }): void {
		this.amendLog(logEntry, logEvent,  LogLevels.LogData, module);
	}

	private amendLog (logEntry: string, logEvent: Object, logType: LogLevels, module: string): void {
		const logStr = module ? ['[', module, '] ', logEntry].join('') : logEntry;

		try {
			if (this.systemLogLevel >= logType) {
				this.amendLogConsole(logStr, logEvent, logType);
			}

			if (this.serverLogLevel >= logType) {
				this.amendLogToBuffer(logStr, logType);
			}
		} catch (e) {
			this.amendLogConsole(['Logger error: ', e].join(''), e, LogLevels.LogError);
		}
	}

	private amendLogConsole (logEntry: string, logEvent: Object, logType: LogLevels): void {
		/* tslint:disable */
		switch (logType) {
			case LogLevels.LogError:
				console.error(logEntry, logEvent);
				break;

			case LogLevels.LogWarning:
				console.warn(logEntry, logEvent);
				break;

			case LogLevels.LogInfo:
				console.info(logEntry, logEvent);
				break;

			default:
				console.log(logEntry, logEvent);
				break;
		}
		/* tslint:enable */
	}

	private amendLogToBuffer (logEntry: string, logType: LogLevels): void {
		// TODO: [Amila] Check the necessity of sending server side logs and implement this
	}
}
