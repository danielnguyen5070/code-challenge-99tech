// If n is close to Number.MAX_SAFE_INTEGER, then n * (n + 1) exceeds safe precision.
// Use with n <= 4,242,640,687
var sum_to_n_a = function (n) {
    return (n * (n + 1)) / 2;
};

// If n is very large (e.g., 10⁹), this will be very slow
var sum_to_n_b = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Will crash for even moderately large n (typically >10,000).
var sum_to_n_c = function (n) {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
};

function runTests() {
    const testCases = [
        { input: 1, expected: 1 },
        { input: 2, expected: 3 },
        { input: 5, expected: 15 },
        { input: 10, expected: 55 },
        { input: 100, expected: 5050 },
        { input: 0, expected: 0 },
        { input: -5, expected: 0 }// Assuming non-positive integers return 0
    ];

    const funcs = [sum_to_n_a, sum_to_n_b, sum_to_n_c];

    funcs.forEach((fn, index) => {
        console.log(`\nTesting function sum_to_n_${String.fromCharCode(97 + index)}:`);

        testCases.forEach(({ input, expected }) => {
            let result;
            try {
                result = fn(input);
            } catch (e) {
                result = `Error: ${e.message}`;
            }

            const passed = result === expected ? "Passed" : `Failed (Got ${result})`;
            console.log(`  sum_to_n(${input}) = ${expected} → ${passed}`);
        });
    });
}

runTests();
