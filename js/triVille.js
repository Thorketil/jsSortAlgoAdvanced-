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
function distanceFromGrenoble(ville) {                          // calcul de la distance entre Grenoble et une ville donnée en utilisant l'approximation équirectangulaire
    const lat1 = 45.188529;
    const lon1 = 5.724524;
    const lat2 = ville.latitude;
    const lon2 = ville.longitude;
    let R = 6371;                                               // rayon de la terre en km
    // let x = 1;                                                  // calcul de la différence de longitude multipliée par le cosinus de la moyenne des latitudes
    let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);    // calcul de la différence de longitude multipliée par le cosinus de la moyenne des latitudes
    let y = (lat2 - lat1);                                      // calcul de la différence de latitude
    let d = Math.sqrt(x * x + y * y) * R;                    // calcul de la distance en km
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

function insertsort() {
    let j;
    for (let i = 1; i < listVille.length; i++) {
        j = i;
        while (j > 0 && isLess(j, j - 1)) {
            swap(j, j - 1);
            j = j - 1;
        }
    }
    displayPermutation(nbPermutation);
    displayListVille(nbComparaison);
}

function selectionsort() {
    console.log("selectionsort - implement me !");
}

function bubblesort() {
    console.log("bubblesort - implement me !");
}

function shellsort() {
    console.log("shellsort - implement me !");
}

function mergesort() {
    console.log("mergesort - implement me !");
}


function heapsort() {
    console.log("heapsort - implement me !");
}

function quicksort() {
    console.log("quicksort - implement me !");
}

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

function displayListVille() {
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
