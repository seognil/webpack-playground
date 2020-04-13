// * test https://github.com/inexorabletash/polyfill

console.log('simple log');

const prettyLog = (a, b) => {
  console.log(a.padEnd(12) + ':', b);
};

const es2016_arr = [1, 2, 3].includes(2);
prettyLog('es2016_arr', es2016_arr);

const es2017_str = '1'.padStart('2', '0');
prettyLog('es2017_str', es2017_str);

const es2017_obj = Object.entries({ a: 1, b: 2 });
prettyLog('es2017_obj', es2017_obj);

const p = new Promise((res) => res());
prettyLog('promise', p);

const arrow = () => {};
prettyLog('arrow', arrow);
