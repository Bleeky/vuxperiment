
const loginFulfilled = (payload, extras) => ({ type: 'LOGIN_FULFILLED', payload, extras });

const loginEpic = (action$, store$, {
  ofType, mergeMap, flatMap, take, catchError, of, race, empty, router,
}) => action$.pipe(
  ofType('LOGIN_REQUEST'),
  mergeMap((action) => {
    console.error('got inside the epic !', action, store$);
    // router.push('/cards-list');
    // action.payload.callback();
    return of(loginFulfilled({ data: 'somepayload' }));
  }),
);

export default loginEpic;
