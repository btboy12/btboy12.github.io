var div = document.createElement("div");
div.style.position = "fixed";div.style.top = 0;div.style.left = 0;
div.style.zIndex = 100;div.style.background="#FFF";div.style.color="#000";
div.style.overFlow="auto";

var nextPage = document.getElementsByClassName("ptb")[0].getElementsByTagName("tr")[0].lastChild;
var images = document.getElementsByClassName("gdtl");
while(1){
	var iImage = images;
	for(var i=0;i<iImage.length;i++){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("get",iImage[i].getElementsByTagName("a")[0].href,true);
		xmlHttp.setRequestHeader( "Content-Type" , "text/html" );
		xmlHttp.onreadystatechange = function( data ) {
		    if ( xmlHttp.readyState === 4 ) {
		    	if(xmlHttp.status == 200){
		    		div.innerHTML += "<p>"+xmlHttp.responseText.match(/<img id="img" src="(.+?)".+?>/)[1] +"</p>";
		    	}
		    }
		};
		xmlHttp.send();
		
	}

	if(nextPage.className!="ptdd"){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("get",nextPage.getElementsByTagName("a")[0].href,false);
		xmlHttp.setRequestHeader( "Content-Type" , "text/html" );
		xmlHttp.send();

		var parser=new DOMParser();
		var xmlDoc=parser.parseFromString(xmlHttp.responseText,"text/xml");

		nextPage = xmlDoc.getElementsByClassName("ptb")[0].getElementsByTagName("tr")[0].lastChild;
		images = xmlDoc.getElementsByClassName("gdtl");
	} else {
		break;
	}
}

document.getElementsByTagName("body")[0].appendChild(div);

