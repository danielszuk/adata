export const LoadScript = (url): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const script: any = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else {
      // Others
      script.onload = () => {
        resolve();
      };
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
