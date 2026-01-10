'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseAutoSaveOptions<T> {
  data: T;
  storageKey: string;
  delay?: number;
  onSave?: (data: T) => void;
  enabled?: boolean;
}

interface UseAutoSaveReturn {
  isSaving: boolean;
  lastSaved: Date | null;
  manualSave: () => void;
}

export function useAutoSave<T>({
  data,
  storageKey,
  delay = 1000,
  onSave,
  enabled = true
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<string>('');

  // Function to save data
  const saveData = useCallback(() => {
    if (!enabled || !data) return;
    
    // Convert current data to string for comparison
    const currentDataString = JSON.stringify(data);
    
    // Only save if data has actually changed
    if (currentDataString === previousDataRef.current) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem(storageKey, currentDataString);
      previousDataRef.current = currentDataString;
      
      // Update last saved timestamp
      const now = new Date();
      setLastSaved(now);
      
      // Call onSave callback if provided
      if (onSave) {
        onSave(data);
      }
      
      console.log(`Auto-saved to ${storageKey} at ${now.toLocaleTimeString()}`);
    } catch (error) {
      console.error('Failed to auto-save:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data, storageKey, enabled, onSave]);

  // Debounced auto-save
  useEffect(() => {
    if (!enabled || !data) return;
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for debounced save
    timeoutRef.current = setTimeout(saveData, delay);
    
    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, saveData, enabled]);

  // Save on page unload
  useEffect(() => {
    if (!enabled) return;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only save if there's actual data
      if (Object.keys(data as any).length > 0) {
        saveData();
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data, saveData, enabled]);

  // Manual save function
  const manualSave = useCallback(() => {
    if (enabled && data) {
      saveData();
    }
  }, [enabled, data, saveData]);

  return {
    isSaving,
    lastSaved,
    manualSave
  };
}