// datestring-convert.ts
// utility function that takes an object with created_at and updated_at properties
// and changes the date value to a local string

const datestringConvert = (obj: {
  created_at: Date | string;
  updated_at: Date | string;
}) => {
  obj.created_at = obj.created_at.toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  obj.updated_at = obj.updated_at.toLocaleString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export default datestringConvert;
