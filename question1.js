// 1) Write a javascript function that finds the duplicate items in any given array

function findDuplicated(items) {
  try {
    if (!items || !items.length)
      return new Error("[findDuplicated]: Invalid Array");

    const duplicated = items.reduce((acc, itemA) => {
      const amount = items.filter((itemB) => itemB === itemA).length;

      const alreadyInArray = acc.includes(itemA);

      if (amount > 1 && !alreadyInArray) return [...acc, itemA];

      return acc;
    }, []);

    console.log("duplicated:", duplicated);
    return duplicated;
  } catch (error) {
    console.error(error);
  }
}
