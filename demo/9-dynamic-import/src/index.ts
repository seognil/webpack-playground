import './style.less';
import './style.scss';

document.write('<br/>Load index.js');

setTimeout(() => {
  import('./lib').then(({ initLib }) => {
    initLib();
  });
}, 1000);
