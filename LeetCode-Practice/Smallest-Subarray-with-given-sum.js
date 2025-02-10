var minSubArrayLen = function(target, nums) {
    let start = 0;
    let subarraySum = 0;
    let minValue = Infinity;
    for(let end=0; end<nums.length; end++){
        subarraySum += nums[end];
        while(subarraySum >= target){
            minValue = Math.min(minValue, end-start+1);
            subarraySum -= nums[start];
            start++;
        }
    }
    return minValue === Infinity ? 0 : minValue;
};
