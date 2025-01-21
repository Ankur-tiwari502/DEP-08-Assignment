/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = function(nums, k) {
    let result = [];
    let numbers = {};
    
    // Count frequencies
    for (let i = 0; i < nums.length; i++) {
        if (numbers[nums[i]]) {
            numbers[nums[i]]++;
        } else {
            numbers[nums[i]] = 1;
        }
    }
    
    // Sort by frequency
    let array = Object.entries(numbers).sort((a, b) => {
        return a[1] - b[1];
    });
    
    // Extract top k frequent elements
    while (result.length != k) {
        let curr = array.pop();
        result.push(Number(curr[0])); // Convert key to number
    }
    
    return result;
};
