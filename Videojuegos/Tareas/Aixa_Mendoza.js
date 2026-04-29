//
//Aixa Elenka Mendoza Filisola
//2026-04-9


"use strict";

//Finds the first character in a string that doesn't repeat.
//Recieves a string and returns a char
function firstNonRepeating (string){
    const conteo = {};
    for (let char of string) {
        conteo[char] = (conteo[char] || 0) + 1;
  }

    for (let char of string) {
    if (conteo[char] === 1) {
        return char;
    }
  }
  return undefined;
}

//Sorts an array in ascending order
//Recieves an array of numbers and returns the sorted array.
function bubbleSort(arr){
    let n = arr.length;
    for (let i = 0; i<n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j]>arr [j+1]) {
                let temp =arr[j];
                arr[j] =arr[j+1];
                arr [j+1]=temp;
        }
    }

}
return arr;
}

//reverts the order of elements of an array and creates a new array with the results
//accepts an array and returns an array
function invertArray (arr) {
    let n= arr.length -1;
    let arr2 = [];
    for (let i = 0; i<=n; i++) {
        arr2[i] = arr[n-i]
    }
    return arr2;

}

//reverts the order of elements of an array and modifies the original
//accepts an array and returns an array
function invertArrayInplace (arr) {
    let n = arr.length -1;
    let temp = 0;
    for (let i = 0; i< arr.length/2; i++) {
        let n2 = n - i;
        temp = arr[i];
        arr[i] = arr [n2];
        arr[n2] = temp;
    }
    return arr;
}

//Capitalizes the first letter of each word in a string. 
//recieves a string and returns a string
function capitalize(text) {
  if (text === "") {
    return "";
  }
  let result = "";
  for (let i = 0; i < text.length; i = i + 1) {
    if (i === 0 || text[i - 1] === " ") {
      result += text[i].toUpperCase();
    } else {
      result += text[i];
    }
  }
  return result;
}

//finds the freatest common divisor of two numbers
//accepts two numbers and returns one
function mcd (a,b) {
    let reminder = 0;
    while (b!=0) {
        reminder = a%b;
        a=b;
        b =reminder
    }
    return a;
}

//Converts a string into hacker speak
//Accepts a string and returns a string
function hackerSpeak(text) {
  let result = "";
  const map = {
    a: "4",
    e: "3",
    i: "1",
    o: "0",
    s: "5",
  };

  for (const letter of text) {
    const lower = letter.toLowerCase();
    result += map[lower] ?? letter;
  }

  return result;
}

//Finds all factos of a number
//accepts a number and returns an array
function factorize (n) {
    let factors = [];
    for (let i = 1; i <= n; i++) {
        if (n%i==0) {
        factors.push(i);
        }
        else {
            continue;
        };
    }
    return factors;

}

//removes duplicate values from an array with the same order
//receives an array and returns an array
function deduplicate (arr) {
    let list = [];
    for (let i = 0; i<arr.length; i++) {
        let n = arr[i];
        let exist = false;
        for (let j = 0; j<list.length; j++ ) {
            if (list[j] === n) {
                exist = true;
                break;
                }
            } 
            if (exist === false) {
                list.push(n);
            }

        } 
    return list;
}

//Finds the length of the shortest string in an array
//Receives an array of strings, returns a number
function findShortestString (s) {
    if (s.length === 0) 
        return 0;
    let result = s[0].length;
    for (let char of s) {
        if (char.length < result) {
            result = char.length;
        }
    }
  return result;
}

//confirms if a string is a palindrome
//accepts a string and returns a bool value (true/false)
function isPalindrome (a) {
    a = a.toLowerCase();
    let arr = a.split ("")
    let n = invertArray(arr);
    for (let i = 0; i <arr.length; i++) {
        if (arr[i] !== n[i]) {
            return false;
        }
    }
    return true;
}

//Sorts an array alphabetically using quicksort
//receives an array and returns an array
function sortStrings (s) {
if (s.length === 1 || s.length === 0) {
    return s;
  }
  const current = s[0];
  const left = [];
  const right = [];

  for (let i = 1; i < s.length; i++) {
    if (s[i] < current) {
      left.push(s[i]);
    } else {
      right.push(s[i]);
    }
  }
  let results = [...sortStrings(left), current, ...sortStrings(right)]
  return results;

}

//Calculates the average and the mode
//receives an array and returns an array
function stats (n) {
    let results = []
    if (n.length === 0) {
        results.push (0);
        results.push (0);
        return results;
    }
    const conteo = {};
    let reps = 0;
    let mode= 0;
    let sum = 0;
    
    for (let i = 0 ; i< n.length; i++) {
        sum = sum + n[i];
    }
    let average = sum /n.length;
    results.push(average);
    for (let num of n) {
        conteo [num] = (conteo[num]||0)+1;
        if (conteo[num]>reps) {
            reps=conteo[num];
            mode = num;
        }
    }
    
    results.push(mode);
    return results;
}

//Finds the most frequent char in a string
//Receives a string and returns a char
function popularString (n) {
    const reps = {};
    let m = 0;
    let S = " ";
    if (n.length <= 0 ) {
        return "";
    }
    for (const char of n) {
        reps[char] = (reps[char] ?? 0) + 1;
       if (reps [char] > m) {
        m = reps[char];
        S = char;
       }
    }
    return S
}

//Checks whether a number is a power of 2
//receives a string and returns true or false

function isPowerOf2 (n) {
    if (n<=0){
        return false;
    }
    while (n%2===0) {
            n = n/2;
    }
    if (n===1) {
        return true;
    }
    else {
        return false;
            }
 }

    


//Sorts an array in descending order
//Recieves an array and returns a new array
function sortDescending (n) {
    let order = bubbleSort(n);
    let results = invertArray (order);
    return results;
}


//My own trials
//console.log(firstNonRepeating('abacddbec'));
//let num =[1,2,3,9,2,1,6]
//let a = [1,0,1,1,0,0]
//console.log(bubbleSort(num));
//console.log(invertArray (num));
//console.log (invertArrayInplace (num));
//console.log (factorize (12));
//console.log (deduplicate (a)) 
//console.log (isPalindrome("aba"));
//console.log (isPalindrome("racecar"));
//console.log (isPalindrome("abc"));
//let num2 = [1,3,2,2]
//console.log (stats (num2));
//console.log(isPowerOf2(8));   
//console.log(isPowerOf2(12)); 
//console.log (sortDescending (num) )


export {
    firstNonRepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
};
