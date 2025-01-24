function vowelFind(str){
    str = str.toLowerCase();  
    let set = new Set();  
    set.add("a");
    set.add("e");
    set.add("i");
    set.add("o");
    set.add("u");
    let words = str.trim().split(" "); 
    let max_count = 0;
    let Maxvowel = "";

    for (let word of words) { 
        let count = 0;
        for (let char of word) { 
            if(set.has(char)){ 
                count++;
            }
        }

        if (count > max_count) { 
            MaxVowels = word;
        }

    }
    return MaxVowels;  
}

console.log(vowelFind("ankuri kumar tiwari"));
