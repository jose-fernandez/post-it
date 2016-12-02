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
	//build the container div
		this.container=document.createElement("div");
		this.container.setAttribute("class","post-it");
		this.container.name=this.id;
		document.querySelector("div.board").appendChild(this.container);
	//Create button delete()
		this.del=document.createElement("img");
		this.del.setAttribute("src","img/cross.png");
		document.querySelectorAll("div.post-it")[this.id].appendChild(this.del);
	//build title input text
		this.title=document.createElement("input");
		this.title.setAttribute("file","text");
		this.title.setAttribute("placeholder","Title");
		document.querySelectorAll("div.post-it")[this.id].appendChild(this.title);
	//build the text area
		this.txt=document.createElement("textarea");
		this.txt.setAttribute("placeholder","Write your note");
		this.txt.cols="20";
		this.txt.rows="9";
		document.querySelectorAll("div.post-it")[this.id].appendChild(this.txt);
	//Create the timer
		this.time=document.createElement("small");
		this.time.innerHTML="12mins";
		document.querySelectorAll("div.post-it")[this.id].appendChild(this.time);

	}

}

class controler{
	
	constructor(){
		this.id=0;
	}
	createPostIt(){
		this.id++;
		//addEventListener(...)
		this.postIt=new postIt(this.id);
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
