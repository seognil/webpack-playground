// * test https://github.com/inexorabletash/polyfill

console.log('simple log');

const prettyLog = (a, b) => {
  console.log(a.padEnd(12) + ':', b);
  // console.log(a + ':', b);
};

(async () => {
  const result = await new Promise((res) =>
    setTimeout(() => {
      res('666');
    }, 500),
  );
  prettyLog('await', result);
})();

{
  const queryString = require('query-string');
  console.log(queryString);
}
