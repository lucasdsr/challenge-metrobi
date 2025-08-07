/**
 * Question 1)
 *
 * Write a javascript function that finds the duplicate items in any given array
 *
 *  */

function findDuplicated(items: Array<string>) {
  try {
    if (!items || !items.length)
      throw new Error("[findDuplicated]: Invalid Array");

    const duplicated = items.reduce((acc, itemA) => {
      const amount = items.filter((itemB) => itemB === itemA).length;

      const alreadyInArray = acc.includes(itemA);

      if (amount > 1 && !alreadyInArray) return [...acc, itemA];

      return acc;
    }, [] as Array<string>);

    console.log("Duplicated:", duplicated);
    return duplicated;
  } catch (error) {
    console.error(error);
  }
}
