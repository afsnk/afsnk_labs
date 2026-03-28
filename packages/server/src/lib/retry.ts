
type RetryOptions = {
  retries: number;
  delayMs: number;
};

// Custom wrapper to add retry and abort functionality
export async function runWithRetry<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  { retries, delayMs }: RetryOptions,
  signal?: AbortSignal
): Promise<T> {

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Check if already aborted before attempting
      if (signal?.aborted) throw new Error("Aborted");

      // Pass the signal to the operation
      return await fn(signal!);
    } catch (error) {
      const isLastAttempt = attempt === retries;
      // If aborted, don't retry, just throw immediately
      if (signal?.aborted || isLastAttempt) throw error;

      // Exponential backoff or simple delay
      await new Promise((resolve) =>
        setTimeout(resolve, delayMs * Math.pow(2, attempt))
      );
    }
  }
  throw new Error("Failed after retries");
}
// ===================================================================

/**
 * Runs an array of promise-returning functions consecutively,
 * waiting a set interval between each, and returns all results
 * in order — just like `.map()`.
 *
 * @param tasks    - Array of functions that return a Promise<T>
 * @param interval - Milliseconds to wait between each task
 * @returns        - Promise resolving to an array of results in order
 */
export async function sequentialMap<T>(
  tasks: Array<() => Promise<T>>,
  interval: number
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < tasks.length; i++) {
    const result = await tasks[i]();
    results.push(result);

    const isLast = i === tasks.length - 1;
    if (!isLast) {
      await new Promise<void>((resolve) => setTimeout(resolve, interval));
    }
  }

  return results;
}


// // --- Example usage ---
// const fetchUser = (id: number) => () =>
//   new Promise<{ id: number; name: string }>((resolve) =>
//     setTimeout(() => resolve({ id, name: `User ${id}` }), 100)
//   );

// sequentialMap(
//   [fetchUser(1), fetchUser(2), fetchUser(3)],
//   500 // 500ms between each call
// ).then(console.log);
// [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }, { id: 3, name: 'User 3' }]
