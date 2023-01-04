let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
// function distanceFromGrenoble(ville) {                          // calcul de la distance entre Grenoble et une ville donnée en utilisant l'approximation équirectangulaire
//     const lat1 = 45.188529;
//     const lon1 = 5.724524;
//     const lat2 = ville.latitude;
//     const lon2 = ville.longitude;
//     let R = 6371000;                                               // rayon de la terre en m
//     let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);    // calcul de la différence de longitude multipliée par le cosinus de la moyenne des latitudes
//     let y = (lat2 - lat1);                                      // calcul de la différence de latitude
//     let d = (Math.sqrt(x * x + y * y) )* R;                    // calcul de la distance en m
//     return d;
//
    function distanceFromGrenoble(ville) {                          // calcul de la distance entre Grenoble et une ville donnée en utilisant l'approximation équirectangulaire
    const lat1 = 45.188529;
    const lon1 = 5.724524;
    const lat2 = ville.latitude;
    const lon2 = ville.longitude;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
}


/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {                                         //prend en paramètre les indices sur 2 villes du tableaux et retourne vrai si listVille[i] est plus prêt de Grenoble que listVille[j]
    nbComparaison++;                                            //incrémente le nombre de comparaison
    if (listVille[i].distanceFromGrenoble < listVille[j].distanceFromGrenoble) { //si la distance de la ville i est plus petite que la distance de la ville j
        return true;
    } else {
        return false;
    }
}

/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
function swap(i, j) {                                           //prend comme paramètres les indices de 2 villes du tableau listVille et permute ces 2 villes
    let temp = listVille[i];                                    //on stocke la ville i dans une variable temporaire
    listVille[i] = listVille[j];                                //on remplace la ville i par la ville j
    listVille[j] = temp;                                        //on remplace la ville j par la ville i
    nbPermutation++;                                            //on incrémente le nombre de permutation
}


function sort(type) {
    switch (type) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
    }
}

function insertsort() {                                       //tri par insertion
    let j;                                                    //variable qui va contenir l'indice de la ville précédente
    for (let i = 1; i < listVille.length; i++) {              //on parcourt le tableau de la ville 1 à la ville n
        j = i;                                                //on initialise j à i
        while (j > 0 && isLess(j, j - 1)) {                //tant que j est supérieur à 0 et que la ville j est plus proche de Grenoble que la ville j-1
            swap(j, j - 1);                                //on permute la ville j avec la ville j-1
            j = j - 1;                                        //on décrémente j
        }
    }
    displayPermutation(nbPermutation);
    displayListVille();
}

function selectionsort() {                                     //tri par sélection
    for (let i = 0; i < listVille.length - 1; i++) {           //on parcourt le tableau de la ville 0 à la ville n-1
        let min = i;                                           //on initialise min à i
        for (let j = i + 1; j < listVille.length; j++) {       //on parcourt le tableau de la ville i+1 à la ville n pour trouver la ville la plus proche de Grenoble
            if (isLess(j, min)) {                              //si la ville j est plus proche de Grenoble que la ville min
                min = j;                                       //on met à jour min
            }
        }                                                      //on a parcouru le tableau et on a trouvé la ville la plus proche de Grenoble
        swap(i, min);                                          //on permute la ville i avec la ville min
    }
    displayPermutation(nbPermutation);
    displayListVille();
}

function bubblesort() {                                         //tri à bulles
    for (let i = 0; i < listVille.length - 1; i++) {            //on parcourt le tableau de la ville 0 à la ville n-1
        for (let j = 0; j < listVille.length - 1; j++) {        //on parcourt le tableau de la ville 0 à la ville n-1
            if (isLess(j + 1, j)) {                           //si la ville j+1 est plus proche de Grenoble que la ville j
                swap(j + 1, j);                               //on permute la ville j+1 avec la ville j
            }                                                    //on a parcouru le tableau et on a trouvé la ville la plus proche de Grenoble
        }
    }
    displayPermutation(nbPermutation);
    displayListVille();
}

function shellsort() {                                       //tri par insertion avec un pas variable
    let h = Math.floor(listVille.length / 2);             //on initialise h à la moitié de la taille du tableau arrondi à l'entier inférieur
    while (h > 0) {                                          //tant que h est supérieur à 0
        for (let i = h; i < listVille.length; i++) {         //on parcourt le tableau de la ville h à la ville n
            let j = i;                                       //on initialise j à i
            while (j >= h && isLess(j, j - h)) {          //tant que j est supérieur ou égal à h et que la ville j est plus proche de Grenoble que la ville j-h
                swap(j, j - h);                           //on permute la ville j avec la ville j-h
                j = j - h;                                   //on décrémente j de h
            }                                               //on a parcouru le tableau et on a trouvé la ville la plus proche de Grenoble
        }
        h = Math.floor(h / 2);                            //on divise h par 2 pour réduire le pas de recherche
    }
    displayPermutation(nbPermutation);
    displayListVille();
}

// function mergesort() {                                      //tri fusion
//     let temp = [];
//     for (let i = 0; i < listVille.length; i++) {
//         temp[i] = listVille[i];
//     }
//     mergeSortRec(temp, 0, listVille.length - 1);
//     displayPermutation(nbPermutation);
//     displayListVille();
// }

// function heapsort() {                                        //tri par tas
//     buildMaxHeap(listVille);
//     for (let i = listVille.length - 1; i >= 1; i--) {
//         swap(0, i);
//         maxHeapify(listVille, 0, i);
//     }
//     displayPermutation(nbPermutation);
//     displayListVille();
// }


// function quicksort() {
//
// }

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {                                //affiche la liste des villes  dans la div listVille
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
