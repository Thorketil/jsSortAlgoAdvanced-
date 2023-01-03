
function swap(A, i, j) {                                       // fonction swap
    var temp = A[i];                                           // sauve la valeur actuelle de A[i] dans une variable temporaire
    A[i] = A[j];                                               // assigne la valeur de A[j] à A[i]
    A[j] = temp;                                               // assigne la valeur de temp à A[j]
}


function insertionSort(inputArr) {
    for (let i = 1; i < inputArr.length; i++) {                 // démarrer à 1
        let j = i - 1;                                          // j est l'index précédent i
        let temp = inputArr[i];                                 // sauve la valeur actuelle de inputArr[i] dans une variable temporaire
        while (j >= 0 && inputArr[j] > temp) {                  // tant que j est supérieur ou égal à 0 et que inputArr[j] est supérieur à temp
            inputArr[j + 1] = inputArr[j];                      // assigne la valeur de inputArr[j] à inputArr[j + 1]
            j--;                                                // décrémente j
        }
        inputArr[j + 1] = temp;                                 // assigne la valeur de temp à inputArr[j + 1] (qui est maintenant inputArr[j])
    }
    return inputArr;
}

function selectionSort(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {                 // démarrer à 0
        let min = i;                                            // min est l'index actuel
        for (let j = i + 1; j < inputArr.length; j++) {         // démarrer à i + 1
            if (inputArr[j] < inputArr[min]) {                  // si la valeur actuelle est inférieure à la valeur minimale actuelle
                min = j;                                        // assigne l'index de la valeur actuelle à min (qui est maintenant l'index de la valeur minimale)
            }
        }
        if (min !== i) {                                        // si min n'est pas égal à i
            swap(inputArr, i, min);                             // swap la valeur minimale avec la valeur actuelle
        }
    }
    return inputArr;                                            // retourne le tableau trié
}

function bubbleSort(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {                 // start at 0
        for (let j = 0; j < inputArr.length - i - 1; j++) {     // start at 0, end at length - i - 1
            if (inputArr[j] > inputArr[j + 1]) {                // if the current value is greater than the next value
                swap(inputArr, j, j + 1);                     // swap the current value with the next value
            }
        }
    }
    return inputArr;
}


function quickSort(inputArr) {
    if (inputArr.length <= 1) {                                 // if the array is empty or has one element
        return inputArr;                                        // return the array
    }
    let pivot = inputArr[0];                                    // set the pivot to the first element
    let left = [];                                              // create an empty array for the left side
    let right = [];                                             // create an empty array for the right side
    for (let i = 1; i < inputArr.length; i++) {                 // start at 1
        if (inputArr[i] < pivot) {                              // if the current value is less than the pivot
            left.push(inputArr[i]);                             // add the current value to the left array
        } else {                                                // otherwise (if the current value is greater than or equal to the pivot)
            right.push(inputArr[i]);                            // otherwise, add the current value to the right array
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));     // return the left array, pivot, and right array
}

/////////////////////////////////////////////////////////////
//                          START                       ////
////////////////////////////////////////////////////////////

// Création de liste de nombres aléatoires

var list = [];                                                 // Création d'une liste vide
let size = 10;                                                 // Taille de la liste
for (let i = 0; i < size; i++) {                               // Boucle pour ajouter des nombres aléatoires à la liste
    list.push(Math.floor(Math.random() * size * 2));        // Ajout d'un nombre aléatoire à la liste
}



// Affichage des résultats
console.log("Liste de nombres aléatoires : ", end = "");
console.table(list);
console.log("Liste triée par insertion : ");
console.table(insertionSort([...list]));
console.log("Liste triée par sélection : ");
console.table(selectionSort([...list]));
console.log("Liste triée par bulle : ");
console.table(bubbleSort([...list]));
console.log("Liste triée par quicksort : ");
console.table(quickSort([...list]));

