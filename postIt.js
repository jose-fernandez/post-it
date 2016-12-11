class board{
	
	constructor(){
		this.list=[];
	}

	starter(x){
		for (let i=0;i<x.length;i++){
			let newPost=new postIt();
			newPost.starter(x[i]);
			this.list.push(newPost);
		}
	}

	addSelect(){
		return document.getElementsByClassName("wallpaper")[0];
	}

	addPlus(){
		return document.getElementsByClassName("plus")[0];
	}
	createPostIt(id){
		var post=new postIt(id);
		post.build();
		this.list.push(post);
		return post;
	}
	time(){
		for (let i=0;i<this.list.length;i++){
			if(this.list[i].min<60){
				this.list[i].min++;
				this.list[i].time.innerHTML=`${this.list[i].min} mins ago.`;
			}else{
				this.list[i].hour++;
				this.list[i].time.innerHTML=`${this.list[i].hour} hours ago.`;
			}
		}
	}
	background(x){
		if (x=="2")
			document.body.style.backgroundImage="url(img/wall.jpg)";
		else
			document.body.style.backgroundImage="url(img/corcho.jpg)";
	}

	delete(x){
		for (let i=0;i<this.list.length;i++){
			if(parseInt(x.parentElement.className.substr(8,2))==this.list[i].id){
				this.list[i].container.remove();
				this.list.splice(i,1);
				return parseInt(x.parentElement.className.substr(8,2));
			}
		}
	}
}

class postIt{
	
	constructor(id){
		this.id=id;
		this.txt="";
		this.tit="";
		this.del="";
		this.min=0;
		this.hour=0;
		
	}

	build(){
		
	//build the container div
		this.container=document.createElement("div");
		this.container.setAttribute("class",`post-it ${this.id}`);
		document.querySelector("div.board").appendChild(this.container);
	//Create button delete()
		this.del=document.createElement("img");
		this.del.setAttribute("src","img/cross.png");
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.del);
	//build title input text
		this.title=document.createElement("textarea");
		this.title.setAttribute("placeholder","Title");
		this.title.setAttribute("class", "input");
		this.title.cols="1";
		this.title.rows="1";
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.title);
	//build the text area
		this.txt=document.createElement("textarea");
		this.txt.setAttribute("placeholder","Write your note");
		this.txt.cols="20";
		this.txt.rows="9";
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.txt);
	//Create the timer
		this.time=document.createElement("small");
		this.time.innerHTML=`${this.min} mins ago.`;
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.time);
	}

	starter(x){
		this.id=x.id;
		this.min=x.min;
		this.hour=x.hour;
	//build the container div
		this.container=document.createElement("div");
		this.container.setAttribute("class",`post-it ${this.id}`);
		document.querySelector("div.board").appendChild(this.container);
	//Create button delete()
		this.del=document.createElement("img");
		this.del.setAttribute("src","img/cross.png");
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.del);
	//build title input text
		this.title=document.createElement("textarea");
		this.title.setAttribute("placeholder","Title");
		this.title.setAttribute("class", "input");
		this.title.cols="1";
		this.title.rows="1";
		let title=document.createTextNode(`${x.title}`);
		this.title.appendChild(title);
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.title);
	//build the text area
		this.txt=document.createElement("textarea");
		this.txt.setAttribute("placeholder","Write your note");
		this.txt.cols="20";
		this.txt.rows="9";
		let txt= document.createTextNode(`${x.txt}`);
		this.txt.appendChild(txt);
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.txt);
	//Create the timer
		this.time=document.createElement("small");
		this.time.innerHTML=`${this.min} mins ago.`;
		document.getElementsByClassName(`${this.id}`)[0].appendChild(this.time);
	}
}

class controler{
	
	constructor(){
		this.id=-1;
		this.mB=new modelBoard();
		this.b=new board();
		this.plus=this.b.addPlus();
		this.select=this.b.addSelect();
		this.starter();
		this.createPostIt();


	}

	starter(){
		if(localStorage.postIt){
			this.showPostIt(JSON.parse(localStorage.getItem("postIt")));
			this.id=this.mB.list[this.mB.list.length-1].id;
		}
		if (localStorage.background){
			this.background(JSON.parse(localStorage.getItem("background")));		
		}
	}

	showPostIt(x){
		var that=this;
		this.mB.starter(x);
		this.b.starter(x);

		for (let i=0;i<this.b.list.length;i++){

			this.b.list[i].del.addEventListener("click", function(){
				that.delete(this);
			});
			this.b.list[i].title.addEventListener("keyup", function(){
				that.saveTitle(this);
			});
			this.b.list[i].txt.addEventListener("keyup", function(){
				that.saveTxt(this);
			});
		}
	}

	background(value){
		this.b.background(value);
	}

	createPostIt(){
		var that=this;
		this.select.addEventListener("click", function(){
			if(that.select.value=="2"){
				that.b.background(that.select.value);
				localStorage.setItem("background", JSON.stringify(that.select.value));
			}else{
				that.b.background(that.select.value);
				localStorage.setItem("background", JSON.stringify(that.select.value));
			}
		});
		
		this.plus.addEventListener("click",
			function(){
				that.id++;
				that.mB.addPostIt(that.id);
				var postIt= that.b.createPostIt(that.id);
				postIt.del.addEventListener("click", function(){
					that.delete(this);
					});
				postIt.title.addEventListener("keyup", function(){
					that.saveTitle(this);
				});
				postIt.txt.addEventListener("keyup", function(){
					that.saveTxt(this);
				});
			});
		
		setInterval(function(){
			that.b.time();
			that.mB.time();
		},60000);
		
	}

	saveTitle(x){
		this.mB.saveTitle(x);
	}

	saveTxt(x){
		this.mB.saveTxt(x);
	}

	delete(x){
		this.mB.delete(this.b.delete(x));
	}
}

class modelPostIt{

	constructor(id){
		this.id=id;
		this.txt="";
		this.title="";
		this.min=0;
		this.hour=0;

	}
}

class modelBoard{
	
	constructor(){
		this.list=[];
	}

	starter(x){
		this.list=x;
	}

	addPostIt(id){
		this.list.push(new modelPostIt(id));
	}


	delete(j){
		for (let i=0;i<this.list.length;i++){
			if(j == this.list[i].id){
				this.list.splice(i,1);
			}
		}

		if (this.list.length===0){
			localStorage.removeItem("postIt");
			console.log("localStorage.postIt");
		}else{
			localStorage.setItem("postIt", JSON.stringify(this.list));
			console.log(localStorage.postIt);
		}
		
		
	}

	saveTitle(x){
		for (let i=0;i<this.list.length;i++){
			if(parseInt(x.parentElement.className.substr(8,2))==this.list[i].id){
				this.list[i].title=x.value;
			}
		}
		localStorage.setItem("postIt", JSON.stringify(this.list));
		console.log(localStorage.postIt);
	}
	saveTxt(x){
		for (let i=0;i<this.list.length;i++){
			if(parseInt(x.parentElement.className.substr(8,2))==this.list[i].id){
				this.list[i].txt=x.value;
			}
		}
		localStorage.setItem("postIt", JSON.stringify(this.list));
		console.log(localStorage.postIt);

	}

	time(){
		for (let i=0;i<this.list.length;i++){
			if(this.list[i].min<60){
				this.list[i].min++;
			}else{
				this.list[i].hour++;
			}
		}
	}
}

window.onload=function(){
	new controler();
};
