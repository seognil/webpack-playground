import './style.less';
import './style.scss';

import './lib';

document.write('<br/>Load index.js');

document.write('<br/>try click:');

document.addEventListener('click', () => {
  document.write('<br/>clicked!');
});
