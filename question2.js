/**
 * Question 2)
 *
 * Write an async javascript function that writes every item in any given array with 1, 2, 4, 8, etc., seconds apart.
 *
 *  */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function showSeccondsApart(items) {
  try {
    let currentDelay = 1000;

    console.log("Starting the print sequence...");

    for (const item of items) {
      await delay(currentDelay);

      console.log(`- Item: "${item}" (after ${currentDelay / 1000} seconds)`);

      currentDelay *= 2;
    }
  } catch (error) {
    console.error(error);
  }
}

showSeccondsApart([1, 2, 4, 8]);
