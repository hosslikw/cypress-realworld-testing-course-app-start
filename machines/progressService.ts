
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import React from 'react';
import { progressMachine } from "./progressMachine";

const LOCAL_STORAGE_ITEM = "progressState";

// Function to attempt to rehydrate state from localStorage
const rehydrateState = () => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_ITEM);
  return savedState ? JSON.parse(savedState) : undefined;
};

// Custom hook to manage and persist the machine state
export function usePersistedProgressMachine() {
  // Use the useMachine hook with the progressMachine. We pass initial state if available.
  const [state, send, service] = useMachine(progressMachine, {
    // Initial state from localStorage if available
    state: rehydrateState()
  });

  // Effect to store state changes to localStorage
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(state));
  }, [state]);

  return { state, send, service };
}
