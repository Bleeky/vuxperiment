const createLinkedSignal = (...signals) => {
  signals = signals.filter((s) => !!s);

  if (signals.length === 1) {
    return signals[0]; // Debugging is easier when we can avoid wrapping
  }

  const controller = new AbortController();
  for (const signal of signals) {
    signal.addEventListener('abort', () => controller.abort());
  }
  return controller.signal;
};

const cancelFetchOnReentrySync = (wrappedFunc) => {
  let currentAbort = new AbortController();

  return (...args) => {
    currentAbort.abort();
    currentAbort = new AbortController();

    const mySignal = currentAbort.signal;

    const injectedFetch = (input, init = {}) => fetch(input, {
      ...init,
      signal: createLinkedSignal(mySignal, init.signal),
    });

    return wrappedFunc(injectedFetch)(...args);
  };
};

const swallowCancellation = (wrappedFunc) => async (...args) => {
  try {
    await wrappedFunc(...args);
  } catch (ex) {
    if (ex.name === 'AbortError') {
      return;
    }

    throw ex;
  }
};

const req = (wrappedFunc) => cancelFetchOnReentrySync(
  (fetch) => swallowCancellation(
    wrappedFunc(fetch),
  ),
);

export default req;
