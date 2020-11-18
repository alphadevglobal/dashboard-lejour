export default function getMostPopular(filteredArray, allItemsArray) {
  const itemsWithQuantityObj = {}

  let i = 0
  filteredArray.forEach((item) => {
    itemsWithQuantityObj[i] = {
      name: item,
      quantity: 0
    };

    i++;
  });

  for (let n = 0; n < filteredArray.length; n++) {
    allItemsArray.forEach((item) => {
      if (item === itemsWithQuantityObj[n].name) {

        itemsWithQuantityObj[n].quantity++
      }
    })
  }

  let mostPopularItem = {
    name: '',
    quantity: 0,
  }

  for (let n = 0; n < filteredArray.length; n++) {
    if(itemsWithQuantityObj[n].quantity > mostPopularItem.quantity) {
      mostPopularItem = {
        name: itemsWithQuantityObj[n].name,
        quantity: itemsWithQuantityObj[n].quantity
      }
    }
  }

  return mostPopularItem
}