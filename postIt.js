class board{
	
	constructor(){
		this.list=[];
	}

	build(){

	}

	addPostIt(){

	}

	delete(postIt){

	}
}

class postIt{
	
	constructor(id,title="",text=""){
		this.id=id;
		this.txt=text;
		this.tit=title;
		this.build();
	}

	build(){
		var postIt=document.createElement("TEXTAREA");
		postIt.setAttribute("class","post-it");
		postIt.name=this.id;
		postIt.cols="20";
		postIt.rows="9";
		document.querySelector("div.board").appendChild(postIt);
	}

}

class controler{
	
	constructor(){
		this.postIt=new postIt(2);
	}
}

class modelPostIt{

	constructor(title="",text=""){
		this.txt=text;
		this.tit=title;
	}
}

class modelBoard{
	
	constructor(){
		this.list=[];
	}

	addPostIt(){

	}

	delete(postIt){

	}
}

window.onload=function(){
	new controler();
};
