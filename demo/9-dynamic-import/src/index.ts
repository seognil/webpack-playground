import './style.less';
import './style.scss';

setTimeout(() => {
  import('./lib').then(({ loadLib }) => {
    loadLib();
  });
}, 1000);

document.write('<br/>Load index.js');

document.write('<br/>try click:');

document.addEventListener('click', () => {
  const div = document.createElement('div');
  div.textContent = 'clicked!';
  document.body.appendChild(div);
});
