# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. The function `getCandidate` has been extracted into a separate module-function. This makes the code easier to read and understand, as the logic for generating the partition key is now separated from the main function.
- If there are no parameters i.e., `event` passed in, it detects it early before any compute and creation of any variables and returns the base value as result i.e., `"0"`
- After this, for case when there is a partition-key available in the `event`, passed as parameter, then returns the that partition-key itself.
- For the case apart from this, `JSON.stringify` function to convert the event object to a string. This ensures that the partition key is always a valid string, even if the event object contains non-string data.

- The overall effect of the refactoring is to improve the readability, maintainability, and efficiency of the code.
- The code is also more efficient, `JSON.stringify` on the data provided, along with a separate function module for `crypto.createHash` that returns a computed hash value.
- The formatting types for the create-hash functions has been treated as global variables.
```
const ALGORITHM_TYPE_NAME = "sha3-512";
const DIGEST_TYPE = "hex";
```
- These can be created as environment variables, if required. This will enable us to only make changes to one place reflect it across the code-base. 