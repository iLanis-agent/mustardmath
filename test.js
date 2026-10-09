const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.soak) { let r; try { r = M.soak(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'soak ' + c.in); }
for (const c of E.split) { let r; try { r = M.split(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'split ' + c.in); }
for (const c of E.batch) { let r; try { r = M.batch(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'batch ' + c.in); }
// anchors
eq(M.soak(100, 2.2).liquidMl, 220, 'anchor soak');
const sp = M.split(300, 2, 1);
eq(sp.vinegarMl, 200, 'anchor vinegar'); eq(sp.waterMl, 100, 'anchor water');
eq(M.batch(4, 200).seedG, 320, 'anchor seed');
// invariant: split parts sum to total
n++;
{ const q = M.split(777, 5, 8); if (Math.abs(q.vinegarMl + q.waterMl - 777) > 0.01) { fail++; console.error('FAIL split invariant'); } }
// errors
const errs = [
  () => M.soak(0, 2), () => M.soak(100, 0), () => M.soak(100, 5),
  () => M.split(0, 2, 1), () => M.split(300, 0, 1), () => M.split(300, 2, -1), () => M.split(300, 2, 0),
  () => M.batch(0, 200), () => M.batch(501, 200), () => M.batch(4, 10),
];
const msgs = ['seed weight must be positive','soak ratio must be positive','past 4:1 the seeds cannot drink it (labeled)',
  'total liquid must be positive','vinegar parts must be positive','water parts cannot be negative','straight vinegar needs no split - pour it (labeled)',
  'at least one jar','past 500 jars you want a steam kettle (labeled)','jar size outside the labeled 50-2000 mL band'];
errs.forEach((f, i) => {
  n++;
  try { f(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);
