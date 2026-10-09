// Mustard math: soak liquid, acid split and batch size - exact ratios, labeled craft norms.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Mustardmath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const round = x => Math.round(x * 100) / 100;

  function soakBand(ratio) {
    if (ratio < 1.8) return 'a thick stone-ground paste (labeled)';
    if (ratio <= 2.6) return 'the classic soak band (labeled)';
    return 'a runny table mustard (labeled)';
  }
  function acidBand(vinegarParts, waterParts) {
    const share = vinegarParts / (vinegarParts + waterParts);
    if (share >= 2 / 3) return 'sharp - clears the sinuses (labeled)';
    if (share >= 1 / 2) return 'the deli middle (labeled)';
    if (share >= 1 / 3) return 'mild and round (labeled)';
    return 'barely a whisper (labeled)';
  }

  // soak liquid from seed weight and liquid-to-seed ratio (2.2 is a labeled norm)
  function soak(seedG, ratio) {
    if (!(seedG > 0)) throw new Error('seed weight must be positive');
    if (!(ratio > 0)) throw new Error('soak ratio must be positive');
    if (ratio > 4) throw new Error('past 4:1 the seeds cannot drink it (labeled)');
    const liquidMl = round(seedG * ratio);
    return { liquidMl, verdict: soakBand(ratio) };
  }

  // split a total liquid into vinegar and water parts
  function split(totalMl, vinegarParts, waterParts) {
    if (!(totalMl > 0)) throw new Error('total liquid must be positive');
    if (!(vinegarParts > 0)) throw new Error('vinegar parts must be positive');
    if (!(waterParts >= 0)) throw new Error('water parts cannot be negative');
    if (waterParts === 0) throw new Error('straight vinegar needs no split - pour it (labeled)');
    const sum = vinegarParts + waterParts;
    const vinegarMl = round(totalMl * vinegarParts / sum);
    const waterMl = round(totalMl - vinegarMl);
    return { vinegarMl, waterMl, verdict: acidBand(vinegarParts, waterParts) };
  }

  // jars -> prepared mustard -> seed and soak liquid at labeled norms (yield x2.5, soak 2.2)
  function batch(jars, jarMl) {
    if (!(jars >= 1)) throw new Error('at least one jar');
    if (jars > 500) throw new Error('past 500 jars you want a steam kettle (labeled)');
    if (!(jarMl >= 50 && jarMl <= 2000)) throw new Error('jar size outside the labeled 50-2000 mL band');
    const preparedMl = round(jars * jarMl);
    const seedG = round(preparedMl / 2.5);
    const liquidMl = round(seedG * 2.2);
    return { preparedMl, seedG, liquidMl, verdict: 'yield x2.5, soak 2.2 (labeled norms)' };
  }

  return { soak, split, batch, soakBand, acidBand };
});
