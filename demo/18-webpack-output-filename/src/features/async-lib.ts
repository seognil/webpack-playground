const render = (text: string) => {
  const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
};

export const initLib = () => {
  render('Load Lib');

  render('try click:');

  document.addEventListener('click', () => {
    render('clicked!');
  });
};
