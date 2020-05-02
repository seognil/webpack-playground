import webpackImg from './webpack-icon-square-big.png';
import smallImg from './webpack-small.png';

const loadImg = (src: string) => {
  const img = document.createElement('img');

  console.log(src);

  img.src = src;

  img.style.maxHeight = '200px';
  img.style.maxWidth = '200px';

  document.body.appendChild(img);
};

loadImg(webpackImg);
loadImg(smallImg);
