setTimeout(async () => {
  const { initLib } = await import(
    /* webpackChunkName: "async-lib" */
    './async-lib'
  );
  initLib();
}, 1000);
