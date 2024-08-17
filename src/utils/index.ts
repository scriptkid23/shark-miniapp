export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const stripVal = (val: string, start = 6, end = 4) => {
  return val ? val.slice(0, start) + '...' + val.slice(val.length - end, val.length) : '';
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};