// @ts-check
// Återkopplingstexter. Aldrig rött kryss och aldrig ordet "fel".
import { formatAnswer } from '../../lib/answers.js';

/**
 * @param {'correct' | 'incorrect' | 'invalid' | 'unsimplified' | 'revealed'} result
 * @param {{ attempts: number, answer: any }} o
 * @returns {{ tone: 'ok' | 'try', text: string }}
 */
export function feedbackFor(result, { attempts, answer }) {
  switch (result) {
    case 'correct':
      return { tone: 'ok', text: 'Rätt. Bra jobbat.' };
    case 'unsimplified':
      return { tone: 'try', text: 'Rätt värde. Kan du förkorta bråket?' };
    case 'invalid':
      if (answer.kind === 'choice') return { tone: 'try', text: 'Välj minst ett alternativ.' };
      if (answer.kind === 'numberLine') return { tone: 'try', text: 'Placera markören på tallinjen och tryck på Kontrollera.' };
      if (answer.kind === 'fraction') return { tone: 'try', text: 'Skriv ett bråk, till exempel 1/5.' };
      return { tone: 'try', text: 'Skriv ett tal, till exempel 25 eller 0,25.' };
    case 'revealed':
      return { tone: 'ok', text: `Svaret är ${formatAnswer(answer)}. Läs gärna lösningen och gå vidare när du är redo.` };
    default:
      return attempts >= 2
        ? { tone: 'try', text: 'Inte riktigt än. Du kan prova igen eller visa svaret.' }
        : { tone: 'try', text: 'Inte riktigt. Prova igen.' };
  }
}
