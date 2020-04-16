setTimeout(async () => {
  const { initLib } = await import('./lib');
  initLib();
}, 1000);
