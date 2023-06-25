const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns partition-key when found from input", () => {
    const mockPartitionObject = {
      partitionKey: '786'
    }
    const trivialKey = deterministicPartitionKey(mockPartitionObject);
    expect(trivialKey).toBe(mockPartitionObject.partitionKey);
  });

  it("Tests the candidate length to be 128 when the string is larger than 256", () => {
    const createStringLargerThan256 = 't'*1000;
    const mockEventObject = {
      partitionKey: createStringLargerThan256,
      some: 'some-value'
    }
    const trivialKey = deterministicPartitionKey(mockEventObject);
    expect(trivialKey.length).toBe(128);
  });
});
