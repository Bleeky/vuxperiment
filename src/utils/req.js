const createLinkedSignal = (...signals) => {
  signals = signals.filter((s) => !!s);

  if (signals.length === 1) {
    return signals[0];
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
    if ((args[1] && args[1].cancelOnReentry !== false) || !args) currentAbort.abort();
    currentAbort = new AbortController();

    const mySignal = currentAbort.signal;

    const injectedFetch = (input, init = {}) => fetch(input, {
      ...init,
      signal: createLinkedSignal(mySignal, init.signal),
    });

    return wrappedFunc(injectedFetch)(...args);
  };
};

const swallowCancellation = (wrappedFunc, settings) => async (...args) => {
  try {
    let r;
    r = await wrappedFunc(...args);
    if (settings.json) r = await r.json();
    return r;
  } catch (ex) {
    if (ex.name === 'AbortError') {
      return;
    }

    throw ex;
  }
};

const req = (wrappedFunc, settings = { json: true }) => cancelFetchOnReentrySync(
  (fetch) => swallowCancellation(
    wrappedFunc(fetch),
    settings,
  ),
);

export default req;
