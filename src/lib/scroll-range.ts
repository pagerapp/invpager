/**
 * Scroll-linked ranges must be strictly increasing AND cover the whole [0,1]
 * timeline. Chromium drives these through native scroll timelines, where a
 * partial or non-monotonic offset list produces wrong (or invalid) keyframes.
 * `rng` normalises a set of stops into a safe full-range pair.
 */
export function rng<T>(input: number[], output: T[]): [number[], T[]] {
  const i: number[] = [];
  const o: T[] = [];
  let prev = -1;
  input.forEach((v, k) => {
    let x = Math.min(1, Math.max(0, v));
    if (x <= prev) x = Math.min(1, prev + 1e-4);
    if (x <= prev) return;
    prev = x;
    i.push(x);
    o.push(output[k] as T);
  });
  if ((i[0] as number) > 0) {
    i.unshift(0);
    o.unshift(o[0] as T);
  }
  if ((i[i.length - 1] as number) < 1) {
    i.push(1);
    o.push(o[o.length - 1] as T);
  }
  return [i, o];
}
