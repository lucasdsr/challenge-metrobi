/**
 * Question 7)
 *
 * Think that you have an unlimited number of carrots, but a limited number of carrot
 * types. Also, you have one bag that can hold a limited weight. Each type of carrot has a
 * weight and a price. Write a function that takes carrotTypes and capacity and return the
 * maximum value the bag can hold.
 *
 * Write an async javascript function that writes every item in any given array with 1, 2, 4, 8, etc., seconds apart.
 *
 *  */

interface CarrotType {
  kg: number;
  price: number;
}

function getMaxValue(carrotTypes: CarrotType[], capacity: number): number {
  const dp: number[] = new Array(capacity + 1).fill(0);

  for (const carrot of carrotTypes) {
    for (
      let currentCapacity = carrot.kg;
      currentCapacity <= capacity;
      currentCapacity++
    ) {
      const potentialValue = carrot.price + dp[currentCapacity - carrot.kg];
      dp[currentCapacity] = Math.max(dp[currentCapacity], potentialValue);
    }
  }

  return dp[capacity];
}

const carrotTypes = [
  { kg: 5, price: 100 },
  { kg: 7, price: 150 },
  { kg: 3, price: 70 },
];
const capacity = 36;

const maxCarrotValue = getMaxValue(carrotTypes, capacity);

console.log(`The maximum value the bag can hold is: $${maxCarrotValue}`);
