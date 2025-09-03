const fs = require('fs');


/**
 * Parses a string as a BigInt in the given base.
 * @param {string} stringValue 
 * @param {number} base 
 * @returns {BigInt} 
 */
function parseBigInt(stringValue, base) {
    const bigBase = BigInt(base);
    let result = 0n; 

    for (const char of stringValue) {
        
        
        const digit = parseInt(char, base);

        if (isNaN(digit)) {
             throw new Error(`Invalid digit '${char}' for base ${base}`);
        }

        
        result = result * bigBase + BigInt(digit);
    }
    return result;
}

/**
 
 * @param {string} filePath 
 */
function solve(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.error(`Error: File not found at ${filePath}`);
            return;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        
        const rootKeys = Object.keys(data).filter(key => key !== 'keys');
        const n = rootKeys.length; 
        
        
        let product = 1n;

        console.log(`Processing ${n} roots from ${filePath}...`);
        
        for (const key of rootKeys) {
            const rootData = data[key];
            const base = parseInt(rootData.base, 10);
            const value = rootData.value;

            
            const decimalRoot = parseBigInt(value, base);
            product *= decimalRoot;
        }

        
        
        if (n % 2 !== 0) {
            product = -product;
        }

        console.log(`\nFinal Constant Term for ${filePath}:`);
        console.log(product.toString());

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}



const args = process.argv.slice(2);

if (args.length === 0) {
    console.log("Usage: node solve.js <path_to_json_file_1> <path_to_json_file_2> ...");
    console.log("\nNo file path provided. Running for default test cases...");
    solve('testcase1.json');
    console.log("\n" + "-".repeat(40) + "\n");
    solve('testcase2.json');
} else {
   
    args.forEach((filePath, index) => {
        solve(filePath);
        if (index < args.length - 1) {
             console.log("\n" + "-".repeat(40) + "\n");
        }
    });
}

