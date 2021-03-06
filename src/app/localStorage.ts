/*=============================================================================
 localStorage.ts - persistent state using the Web Local Storage

 (C) 2020 Soomin K., SpacetimeQ INC.
=============================================================================*/

export const loadPersistState = () => {
  try {
    const serializedState = localStorage.getItem('rtktstate');
    if (serializedState === null)
      return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const savePersistState = (state: Object) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
}
