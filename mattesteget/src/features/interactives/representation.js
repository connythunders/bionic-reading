// @ts-check
// En ingång för alla representationer, så att lektioner och ledtrådar kan skapa dem från data.
import { createNumberLine } from './numberLine.js';
import { createFractionBars } from './fractionBars.js';
import { createPercentBar } from './percentBar.js';
import { createMoney } from './money.js';

/**
 * @param {{ kind: string, config: any, interactive?: boolean, label?: string }} spec
 * @returns {{ el: HTMLElement }}
 */
export function createRepresentation({ kind, config, interactive = false, label }) {
  switch (kind) {
    case 'numberLine':
      return createNumberLine({ ...config, interactive, label: label ?? config.label });
    case 'fractionBars':
      return createFractionBars({ ...config, interactive });
    case 'percentBar':
      return createPercentBar({ ...config, interactive });
    case 'money':
      return createMoney({ ...config, interactive });
    default:
      throw new Error(`Okänd representation: ${kind}`);
  }
}
