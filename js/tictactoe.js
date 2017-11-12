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
	gc.beginPath();
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
	gc.closePath();
	document.getElementById("gagne").style.display="none";
	document.getElementById("perdu").style.display="none";
	document.getElementById("match").style.display="none";
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

//permet au joueur de jouer
function choisirCase(e){ // e est un objet javascript de type Event	
	mc=	document.getElementById("canva");
	var x = e.clientX;
	var y = e.clientY;

	//coordonne par rapport au canvas
/*	y-=mc.offsetTop;
	x-=mc.offsetLeft;*/
	y += mc.scrollLeft - mc.offsetLeft;
    x += mc.scrollTop - mc.offsetTop;
	console.log(x, y);
	console.log("compteur:"+compteur);
		console.log(bool);

	// récupère l'unité
	x = Math.floor(parseInt(x/200));
	y= Math.floor(parseInt(y/200));
	if ((bool==false)&& (compteur<8)){ 

	//si le comteur pair et que la case est vide, je joueur peux jouer
		if ((compteur%2==0) && tab[x][y].aqui == VIDE){
			tab[x][y].aqui=JOUEUR;			//la case prend la valeur joueur
			console.log(tab[x][y].aqui);	
			tab[x][y].afficheToi();			//affiche l'img
			trouveAlignement(tab);			//cherche si alignement
			compteur++;
			//Si il n'y a pas d'alignement et que le compteur est inférieur le robot peux jouer ( compteur evite qu'il tourne à l'infini)				
				if(compteur < 9 && bool == false){
					var tps=setTimeout('robot()',500);			//execute fonction robot après une demi seconde
				}
		}
	}

	//GESTION MATCH NUL
	//Au dernier click à la case restant, si pas d'alignement trouvé avant
	else if((bool==false)&& (compteur>=8)){
		if (tab[x][y].aqui == VIDE){		//Si la case est vide
			tab[x][y].aqui=JOUEUR;			//La mettre a joueur
			tab[x][y].afficheToi();			//afficher l'image ds la case
			trouveAlignement(tab);			//rechercher alignementC
				if(bool==false){			//si pas d'alignement alors match nul et afficher la case
					tab[x][y].afficheToi();	
					matchNul();
			}
		}
	}	
}

	//ROBOT

function robot(){
	var x;
	var y;
	do{		//trouver une case au hasard tant que la case est différente de VIDE
		x = Math.floor(Math.random()*3);
		y = Math.floor(Math.random()*3);
	}while(tab[x][y].aqui !=VIDE);
	tab[x][y].aqui=ORDI; 		//Mettre la case a ORDI
	tab[x][y].afficheToi();		//Afficher img pour l'ordi
	trouveAlignement(tab);		//Rechercher si alignement
	compteur++;					//Incrémenter compteur
}
	

	//GERER ALIGNEMENT
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

 //FONCTION QUI GAGNE?


function matchNul(){
	document.getElementById("match").style.display="block";
}
function perdu(){
	document.getElementById("perdu").style.display="block";

}
function gagne(){
	document.getElementById("gagne").style.display="block";
}