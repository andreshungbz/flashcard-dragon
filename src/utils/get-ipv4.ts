// get-ipv4.ts
// utility function that returns the host's IPv4 address or `localhost`

import os from 'node:os';

const getIPv4 = (): string => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const ifaceList = interfaces[name];
    if (ifaceList) {
      for (const iface of ifaceList) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  return 'localhost';
};

export default getIPv4;
