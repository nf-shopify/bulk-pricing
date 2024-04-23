// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").CartOperation} CartOperation
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const operations = input.cart.lines.reduce(
    /** @param {CartOperation[]} acc */
    (acc, cartLine) => {
      const updateOperation = optionallyBuildUpdateOperation(cartLine);

      if (updateOperation) {
        return [...acc, { update: updateOperation }];
      }

      return acc;
    },
    []
  );
  return operations.length > 0 ? { operations } : NO_CHANGES;
}

/**
 * @param {RunInput['cart']['lines'][number]} cartLine
 */
function optionallyBuildUpdateOperation({
  id: cartLineId,
  quantity,
  merchandise,
}) {
  // Check if the merchandise has locationPrices metafield populated
  if (!merchandise?.bulkPrices?.value) {
    return null;
  }

  const bulkPrices = JSON.parse(merchandise?.bulkPrices?.value);
  console.log(`Qty: ${quantity}`);

  const newPrice = findBulkPrice(quantity, bulkPrices);

  const hasBulkPrice = Number(newPrice) > 0;
  console.log(`Bulk Price: ${hasBulkPrice}`);

  if (merchandise.__typename === "ProductVariant" && hasBulkPrice) {
    return {
      cartLineId,
      price: {
        adjustment: {
          fixedPricePerUnit: {
            amount: Number(newPrice).toFixed(2),
          },
        },
      },
    };
  }
  return null;
}

function findBulkPrice(quantity, bulkPrices) {
  // Use reduce to iterate over the locationPrices
  return bulkPrices.bulkPrices.reduce((price, bulkPrice) => {
    return quantity >= bulkPrice.quantity ? bulkPrice.price : price;
  }, []);
}
