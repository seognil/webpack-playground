{
  const def = 42;
  const data = null ?? def;
  console.warn('nullish', data);
}

{
  type Struct = {
    arr?: number[];
    cb?: Function;
  };

  let inst: Struct = {
    cb: () => 233,
  };

  const cbRes = inst.cb?.();
  const arrRes = inst.arr?.[0];

  console.warn(cbRes, arrRes);
}
