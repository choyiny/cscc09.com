/**
 * A simple JavaScript library to demonstrate the concept of a React-like state management system.
 * This library is not a full implementation of React, but rather a simplified version to illustrate
 * the core concepts of state management and component lifecycle.
 *
 * Two main functions are provided:
 * - `useState`: Allows you to add state to your components.
 * - `useEffect`: Allows you to perform side effects based on state dependencies.
 */
const meact = (function () {
  "use strict";
  const module = {};

  // In this implementation, the state object is a simple key-value store that is global to the module.
  // In React, for example, the state is scoped to a component.
  const state = {};

  const useEffectListeners = {};

  /**
   * useState allows you to add state to your components.
   *
   * Example:
   * const [count, getCount, setCount] = useState(0);
   * setCount(count + 1); // Updates the state and triggers rerenders based on defined useEffect listeners.
   * getCount(); // Returns the current state value.
   *
   * The `count` variable is used as a dependency for useEffect.
   */
  module.useState = function (initialValue) {
    const key = Symbol(); // Generate a unique key for the state
    state[key] = initialValue;
    return [
      key,
      function () {
        // return current value as a clone to prevent direct mutation
        return structuredClone(state[key]);
      },
      function (newValue) {
        state[key] = newValue;
        if (useEffectListeners[key]) {
          useEffectListeners[key].forEach((callback) => callback(newValue));
        }
      },
    ];
  };

  module.useEffect = function (callback, dependencies) {
    if (dependencies.length === 0) {
      // If no dependencies are provided, call the callback immediately
      callback();
      return;
    }
    // Register the callback for each dependency
    dependencies.forEach((dep) => {
      if (!useEffectListeners[dep]) {
        useEffectListeners[dep] = [];
      }
      useEffectListeners[dep].push(callback);
    });
    // Call the callback immediately to simulate componentDidMount in React
    callback(state[dependencies[0]]);
  };

  return module;
})();
