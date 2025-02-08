
var maximumSubarraySum = function(nums, k) {
    let maxSum = 0;
    const freqMap = new Map();
    let left = 0, curSum = 0;

    for (let right = 0; right < nums.length; right++) {
        freqMap.set(nums[right], (freqMap.get(nums[right]) || 0) + 1);
        curSum += nums[right];

        while (freqMap.get(nums[right]) > 1) {
            freqMap.set(nums[left], freqMap.get(nums[left]) - 1);
            curSum -= nums[left];
            left++;
        }

        if (right - left + 1 === k) {
            maxSum = Math.max(maxSum, curSum);
            curSum -= nums[left];
            freqMap.set(nums[left], freqMap.get(nums[left]) - 1);
            left++;
        }
    }

    return maxSum;
};
