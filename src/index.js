const levels = Object.fromEntries(
  ['trace', 'debug', 'info', 'warn', 'error'].map((level, number) => [
    level,
    number,
  ]),
);

const noop = () => {};

const makrut = (minLevel = 'info') => {
  const logger = Object.fromEntries(
    Object.keys(levels).map((levelName, levelNumber) => [
      levelName,
      levelNumber >= levels[minLevel.toLowerCase()]
        ? (message, object) => {
          console[levelName](`${levelName.toUpperCase()}: ${message || ''}`);
          if (object !== undefined) {
            console.dir(object);
          }
        }
        : noop,
    ]),
  );

  Object.keys(logger).forEach(level => {
    const inspector = message => object => {
      logger[level](message, object);
      return object;
    };

    logger[level].inspect = messageOrObject => (typeof messageOrObject === 'string'
      ? inspector(messageOrObject)
      : inspector('')(messageOrObject)
    );
  });

  return logger;
};

export default makrut;
