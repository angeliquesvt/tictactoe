const VIDE=-1;
const ORDI=0;
const JOUEUR=1;

function Case(x,y){
	//Propriétés (attributs)
	this.posX=x;
	this.posY=y;
	this.aqui = VIDE;
	console.log(this.aqui);
	//methode d'affichage d'une case
	
	this.afficheToi=function(){
		var img=new Image();
		
		if(this.aqui==JOUEUR){
			img.src="img/croix.png";
		}
		else if (this.aqui==ORDI){
			img.src="img/rond.png";
		}
		else{
			img.src="";
		} 
		
		img.posX=this.posX;
		img.posY=this.posY;
		
		img.onload=function(){
			gc.drawImage(this,this.posX*200,this.posY*200,195,195);
		};
	}
	
}

