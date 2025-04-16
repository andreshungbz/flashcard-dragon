// string-convert.ts
// utility function takes any value and returns it as a string while trimming it

const stringConvert = (v1: any): string => {
  let r1 = v1 ? String(v1) : '';
  r1 = r1.trim();
  return r1;
};

export default stringConvert;
