function LongestWord(str){
    let count;
    let max_count = -1;
    let str_max= "";
    str = str.trim().split(" ");
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        count = 0;
        for (const char of element) {
            count = count + 1;
        }
        if(max_count < count){
            str_max = str[index];
            max_count = count;
        }
    }
    return str_max;
}

console.log(LongestWord("Ankur kumar ntiwari is from BagahiBaazar gopalganj"));
