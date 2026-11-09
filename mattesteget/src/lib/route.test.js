// @ts-check
import { test, assert } from '../../tests/harness.js';
import { parseHash, matchRoute } from './route.js';

test('parseHash: tom hash blir startsidan', () => {
  assert.equal(parseHash(''), '/');
  assert.equal(parseHash('#'), '/');
  assert.equal(parseHash('#/'), '/');
});

test('parseHash: tar bort fråga och avslutande snedstreck', () => {
  assert.equal(parseHash('#/moduler/4?x=1'), '/moduler/4');
  assert.equal(parseHash('#/moduler/'), '/moduler');
  assert.equal(parseHash('#moduler'), '/moduler');
});

test('matchRoute: hittar fasta rutter och parametrar', () => {
  const routes = [{ path: '/' }, { path: '/moduler' }, { path: '/moduler/:id' }];
  assert.equal(matchRoute('/', routes)?.route.path, '/');
  assert.equal(matchRoute('/moduler', routes)?.route.path, '/moduler');
  const m = matchRoute('/moduler/procent', routes);
  assert.equal(m?.route.path, '/moduler/:id');
  assert.equal(m?.params.id, 'procent');
});

test('matchRoute: okänd sökväg ger null, trasig kodning kastar inte', () => {
  const routes = [{ path: '/moduler/:id' }];
  assert.equal(matchRoute('/finns-inte', routes), null);
  assert.equal(matchRoute('/moduler/%E0%A4%A', routes), null);
});
