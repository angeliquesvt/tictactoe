var mc, gc;
var tab;
var compteur=0;
var bool = false;
var finjeu = true;
//initalisation du contexte graphique
function init(){

//recupère le contexte
mc=	document.getElementById("canva");
gc = mc.getContext('2d');
//clear le canva
gc.clearRect(0,0,600,600);

//dessine les bordures de chaque cases
gc.fillStyle="rgb(0,0,0)";
gc.strokeStyle="rgb(0,0,0)";
gc.strokeRect(0,0,200,200);
gc.strokeRect(200,0,200,200);
gc.strokeRect(400,0,200,200);

gc.strokeRect(0,200,200,200);	
gc.strokeRect(200,200,200,200);
gc.strokeRect(400,200,200,200);

gc.strokeRect(0,400,200,200);	
gc.strokeRect(200,400,200,200);
gc.strokeRect(400,400,200,200);
gc.lineWidth=1;

document.getElementById("gagne").style.display="none";
document.getElementById("perdu").style.display="none";
// initialise les case à vode
tab=new Array();
for(var ligne=0; ligne<3;ligne++){
	tab[ligne]=new Array();
	for (var col=0; col<3; col++){
		tab[ligne].push(new Case(ligne, col));
		tab[ligne][col].afficheToi();
	}

}
//sur un click, execute la fonction choisir case
mc.addEventListener('click', choisirCase, false);

//clear de tout les compteurs
compteur=0;
bool=false;
finjeu = true;
}

//fin de jeu si toute les case son differente de vide
function finJeu(){
	for(var ligne=0; ligne<3;ligne++){
		for (var col=0; col<3; col++){
			if (tab[ligne][col].aqui==VIDE) {
				finjeu = true;
			}else{
				finjeu = false;
			}

		}

	}
}

//permet au joueur de jouer
function choisirCase(e){ // e est un objet javascript de type Event	
	mc=	document.getElementById("canva");
	if (bool==false){ 	//permet de trouver l'alignement

		//recupère les coordonnée du click
		var x = e.clientX;
		var y = e.clientY;

		//coordonne par rapport au canvas
		y-=mc.offsetTop;
		x-=mc.offsetLeft;
		console.log(x, y);
		// récupère l'unité
		x = Math.floor(parseInt(x/200));
		y= Math.floor(parseInt(y/200));

		//si le comteur %2 est à 0 et que la case est vide, je joueur peux jouer
		if ((compteur%2==0) && tab[x][y].aqui == VIDE){
			tab[x][y].aqui=JOUEUR;		//la case prend la valeur joueur
			console.log(tab[x][y].aqui);	
			tab[x][y].afficheToi();	//affiche l'img
			compteur++;			//incrémente le compteur pr le robot
			trouveAlignement(tab);			//cherche si un alignement existe
			if(compteur < 9 && bool == false){ 	// tant que le compteur est inférieur a 9 pour pas faire tourner le robot à l'infini et qu'il y a pas d'alignement
				var tps=setTimeout('robot()',500);			//exec fonction robot après une demi seconde
			}
			console.log(compteur+"COMPT");
		}

	}
	else if (finJeu()){
		alert("fin de jeu");	//Si boot est à true le jeux est fini
	}	
}


function robot(){
	var x;
	var y;
	do{
		x = Math.floor(Math.random()*3);
		y = Math.floor(Math.random()*3);
	}while(tab[x][y].aqui !=VIDE);

	tab[x][y].aqui=ORDI;
	tab[x][y].afficheToi();
	trouveAlignement(tab);
	compteur++;
}

function trouveAlignement(t) {
	var alignement;
	var alignementC = [];
	var alignementD = [];
	for(i=0;i< t.length; i++) {
		alignement = [];
		for(j=0; j<t.length; j++) {
			alignement.push(t[i][j]);
		}

// INLINE
if((alignement[0].aqui == 1) && (alignement[1].aqui == 1) && (alignement[2].aqui == 1)) {
	bool = true;
	gagne();
	return 1;
}else if((alignement[0].aqui == 0) && (alignement[1].aqui == 0) && (alignement[2].aqui == 0)) {
	bool = true;
	perdu();
	return 0;
}else if((alignement[0].aqui == -1) && (alignement[1].aqui == -1) && (alignement[2].aqui == -1)) {
	bool = false;
	return -1;
}
}

for(j=0; j<t.length; j++) {
	alignementC = [];
	for(i=0;i< t.length; i++) {
		alignementC.push(t[i][j]);
	}
	if((alignementC[0].aqui == 1) && (alignementC[1].aqui == 1) && (alignementC[2].aqui == 1)) {
		bool = true;
		gagne();
		return 1;
	}else if((alignementC[0].aqui == 0) && (alignementC[1].aqui == 0) && (alignementC[2].aqui == 0)) {
		bool = true;
		perdu();
		return 0;
	}else if((alignementC[0].aqui == -1) && (alignementC[1].aqui == -1) && (alignementC[2].aqui == -1)) {
		bool = false;
	}

}

function perdu(){
	document.getElementById("perdu").style.display="block";
	
}
function gagne(){
	document.getElementById("gagne").style.display="block";
}
//DIAGO 1 DEUXIEME METHODE

/* if(t[0][0].aqui == 1 && t[1][1].aqui == 1 && t[2][2].aqui == 1){
alert("Bien joué");
}else if(t[0][0].aqui == 0 && t[1][1].aqui == 0 && t[2][2].aqui == 0){
alert("t'es nul");
}else{

}*/

//DIAGO 1 
for(i=0;i< t.length; i++) {
	alignementD.push(t[i][i]);
}
if((alignementD[0].aqui == 1) && (alignementD[1].aqui == 1) && (alignementD[2].aqui == 1)) {
	bool = true;
	gagne();
	return 1;
}else if((alignementD[0].aqui == 0) && (alignementD[1].aqui == 0) && (alignementD[2].aqui == 0)) {
	bool = true;
	perdu();
	return 0;
}else if((alignementD[0].aqui == -1) && (alignementD[1].aqui == -1) && (alignementD[2].aqui == -1)) {
	bool = false;
}
alignementD = [];



//DIAGO 2
if(t[0][2].aqui == 1 && t[1][1].aqui == 1 && t[2][0].aqui == 1){
	bool = true;
	gagne();
}else if(t[0][2].aqui == 0 && t[1][1].aqui == 0 && t[2][0].aqui == 0){
	bool = true;
	perdu();
}else{
	bool = false;
}


}



