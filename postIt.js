class board{
	
	constructor(){
		this.list=[];
	}

	build(){

	}

	addPostIt(){
		return document.getElementsByClassName("plus")[0];
	}
	createPostIt(list){
		this.list.push(new postIt(list[list.length-1].id));

	}

	delete(postIt){

	}
}

class postIt{
	
	constructor(id,title="",text=""){
		this.id=id;
		this.txt=text;
		this.tit=title;
		this.del="";
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
		this.mB=new modelBoard();
		this.b=new board();
		this.plus=this.b.addPostIt();
		this.createPostIt();

	}
	createPostIt(){
		this.id++;
		var that=this;
		this.plus.addEventListener("click",
			function(){
				that.mB.addPostIt(that.id);
				that.b.createPostIt(that.mB.list);
			}
		);
		

	}
}

class modelPostIt{

	constructor(id, title="",text=""){
		this.id=id;
		this.txt=text;
		this.tit=title;
		this.time;
	}
}

class modelBoard{
	
	constructor(){
		this.list=[];
		this.con=-1;
	}

	addPostIt(){
		this.con++;
		this.list.push(new modelPostIt(this.con));
	}

	delete(postIt){

	}
}

window.onload=function(){
	new controler();
};
