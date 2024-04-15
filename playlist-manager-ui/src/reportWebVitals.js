import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
  const onPerfEntry = null; // Add this line
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
});

const reportWebVitals = null;

export default reportWebVitals;
