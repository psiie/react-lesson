
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export function injectSagaFactory(store) {
  return function injectSaga(key, descriptor = {}, args) {
    const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
    const { saga, mode } = newDescriptor;

    let hasSaga = Reflect.has(store.injectedSagas, key);

    // if (process.env.NODE_ENV !== 'production') {
    //   const oldDescriptor = store.injectedSagas[key];
    //   // enable hot reloading of daemon and once-till-unmount sagas
    //   if (hasSaga && oldDescriptor.saga !== saga) {
    //     oldDescriptor.task.cancel();
    //     hasSaga = false;
    //   }
    // }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      store.injectedSagas[key] = { ...newDescriptor, task: store.runSaga(saga, args) }; // eslint-disable-line no-param-reassign
    }
  };
}

// export function ejectSagaFactory(store) {
//   return function ejectSaga(key) {
//     if (Reflect.has(store.injectedSagas, key)) {
//       const descriptor = store.injectedSagas[key];
//       if (descriptor.mode !== DAEMON) {
//         descriptor.task.cancel();
//         // Clean up in production; in development we need `descriptor.saga` for hot reloading
//         // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
//         if (process.env.NODE_ENV === 'production') {
//           store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
//         }
//       }
//     }
//   };
// }

export default function getInjectors(store) {
  return {
    injectSaga: injectSagaFactory(store, true),
    // ejectSaga: ejectSagaFactory(store, true),
  };
}
