import { Injectable } from '@angular/core';

export class Symbol {
  constructor(public id: number,  public code: string, public description: string) { }
}

const SYMBOLS = [
  new Symbol(1, 'Emaar~DFM', 'Emaar properties'),
    new Symbol(2, 'JKH~LKR', 'Jhon Keels properties')
];

const symbolsPromise = Promise.resolve(SYMBOLS);

@Injectable()
export class SymbolService {
  getSymbols(): Promise<Symbol[]> {
    return symbolsPromise;
  }

  getSymbol(id: number): Promise<Symbol> {
  return this.getSymbols().then(symbols => symbols.find(symbol => symbol.id === id) );
  }

  // See the "Take it slow" appendix
  getSymblsSlowly(): Promise<Symbol[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getSymbols()), 2000);
    });
  }
}

