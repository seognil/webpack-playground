import webpackLogo from './webpack-icon-square-big.png';

const img = document.createElement('img');

console.log(webpackLogo);

img.src = webpackLogo;

img.style.maxHeight = '200px';
img.style.maxWidth = '200px';

document.body.appendChild(img);
