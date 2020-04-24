setTimeout(async () => {
  const { initLib } = await import('./async-lib');
  initLib();
}, 1000);
