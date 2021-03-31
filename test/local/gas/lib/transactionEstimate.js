const assert = require("assert");

const testTransactionEstimate = async(contractFn, args, options, instance) => {
  await instance.methods.reset().send({ from: options.from, gas: 5000000 });
  const method = contractFn(...args);
  const gasEstimate = await method.estimateGas(options);
  const receipt = await method.send(options);

  assert.strictEqual(receipt.status, true, "Transaction must succeed");
  assert.strictEqual(receipt.gasUsed, String(gasEstimate), "gasUsed");
  assert.strictEqual(receipt.cumulativeGasUsed, String(gasEstimate), "estimate");
};

module.exports = testTransactionEstimate;
