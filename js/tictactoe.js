var mc, gc;
var tab;
var compteur=0;
var bool = false;
var finjeu = true;
//initalisation du contexte graphique
function init(){

	mc=	document.getElementById("canva");
	gc = mc.getContext('2d');
	gc.clearRect(0,0,600,600);
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

	mc.addEventListener('click', choisirCase, false);

	
	tab=new Array();
	for(var ligne=0; ligne<3;ligne++){
		tab[ligne]=new Array();
		for (var col=0; col<3; col++){
			tab[ligne].push(new Case(ligne, col));
			tab[ligne][col].afficheToi();
		}

	}
	compteur=0;
	bool=false;
	finjeu = true;
	console.log(compteur);
}
	
/*	function finJeu(t){
		for(var ligne=0; ligne<3;ligne++){

			for (var col=0; col<3; col++){
			if (t[ligne][col].aqui==VIDE) {
					finjeu = true;
				}else{
					finjeu = false;
				}

				}

		}
	}*/


	function choisirCase(e){ // e est un objet javascript de type Event	
	mc=	document.getElementById("canva");
		if (bool==false){

			var x = e.clientX;
			var y = e.clientY;
			y-=mc.offsetTop;
			x-=mc.offsetLeft;
			console.log(x, y);
			x = Math.floor(parseInt(x/200));
			y= Math.floor(parseInt(y/200));
			if ((compteur%2==0) && tab[x][y].aqui == VIDE){
				tab[x][y].aqui=JOUEUR;
				console.log(tab[x][y].aqui);	
				tab[x][y].afficheToi();	
			compteur++;
			trouveAlignement(tab);
				if(compteur < 9 && bool == false){ 
					var tps=setTimeout('robot()',500);
				}
			console.log(compteur+"COMPT");
			}

			}
			else{
				alert("fin de jeu");
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
    	alert("t'es nul batman");
    }
    function gagne(){
    	alert("bien joué batman")
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


