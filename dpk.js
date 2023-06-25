const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const ALGORITHM_TYPE_NAME = "sha3-512";
const DIGEST_TYPE = "hex";

const returnComputedHash = (data) => (
  crypto.createHash(ALGORITHM_TYPE_NAME).update(data).digest(DIGEST_TYPE)
) 

// return type string
const getCandidate = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event.partitionKey) {
    return String(event.partitionKey);
  }
  
  const data = JSON.stringify(event);
  const resultantCandidate = returnComputedHash(data);
  
  if (resultantCandidate.length > MAX_PARTITION_KEY_LENGTH) {
    return String(returnComputedHash(data));
  }
  
  return String(resultantCandidate);
}

exports.deterministicPartitionKey = (event) => {
  let candidate;
  
  candidate = getCandidate(event); // a string

  return candidate;
};