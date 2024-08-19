export const sleep = (ms: number) => {
  let timeoutId: NodeJS.Timeout;
  const promise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(resolve, ms);
  });

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return { promise, cancel };
};

export const stripVal = (val: string, start = 6, end = 4) => {
  return val ? val.slice(0, start) + '...' + val.slice(val.length - end, val.length) : '';
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};