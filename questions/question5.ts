/**
 * Question 5)
 *
 * A building has 100 floors. One of the floors is the highest floor an egg can be dropped
 * from without breaking. If an egg is dropped from above that floor, it will break. If it is
 * dropped from that floor or below, it will be completely undamaged and you can drop the
 * egg again. Given two eggs, find the highest floor an egg can be dropped from without
 * breaking, with as few drops as possible in the worst-case scenario.
 *
 * *  */

/**
 * RESPONSE ---------------------------------------------------------------------------------------
 *
 * My optimal strategy involves making larger "jumps" with the first egg. When it breaks,
 * I use the second egg to test the floors within the range where the first egg broke.
 *
 * The key insight is that if my first egg breaks on floor X, I know the critical floor is somewhere between
 * the floor I tested just before X (let's call it Y) and X. With my second egg, I then have to test each floor one by one
 * in that interval. To minimize the worst-case scenario, I want the number of drops I might have to make with the second egg
 * to be equal to the number of drops I've already made with the first egg up to that point.
 *
 * The sequence of jumps that minimizes the worst-case scenario is a decreasing arithmetic progression. I start by testing on floor X, then X+(X−1), then X+(X−1)+(X−2), and so on. The smallest X such that the sum of X+(X−1)+...+1 is greater than or equal to 100 is the answer. This sum can be calculated as X(X+1)/2.
 *
 * For 100 floors:
 *
 * If I choose X=13, the sum is 13∗14/2=91. This is not enough floors.
 * If I choose X=14, the sum is 14∗15/2=105. This is enough floors!
 *
 * This means that the minimum number of drops in the worst-case scenario is 14.
 *
 * *  */

function findMinimumDrops(eggs: number, floors: number): number {
  const maxFloors: number[][] = Array.from({ length: eggs + 1 }, () =>
    Array(floors + 1).fill(0)
  );

  let drops = 0;

  while (maxFloors[eggs][drops] < floors) {
    drops++;
    for (let k = 1; k <= eggs; k++) {
      maxFloors[k][drops] =
        maxFloors[k][drops - 1] + maxFloors[k - 1][drops - 1] + 1;
    }
  }

  return drops;
}

const eggs = 2;
const floors = 100;

const minDrops = findMinimumDrops(eggs, floors);

console.log(
  `With ${eggs} eggs and ${floors} floors, the minimum drops are: ${minDrops}`
);

// Expected output: With 2 eggs and 100 floors, the minimum drops are: 14
