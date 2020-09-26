var IDS = []; IDS.push(24);  
var URL = '*****';

var audio = new Audio();
audio.src = '.../alert.mp3';

// Request json data
function fetch(){
    if (window.t) 
       clearInterval(window.t);

    $.ajax({
        url: URL,
        method: 'GET',
        success: onSuccess,
        error: () => {
           console.warn("Unable to Reach Server!");
	   console.log("Retrying in 1 Seconds...");
  
       },
    })
    window.t = setInterval(fetch, 1000);
}

function onSuccess(data){
        var data = data[data.length-1];
        var id = data.id;
        if(!IDS.includes(id)){
           IDS.push(id);
           var name = data.name;
           var surname = data.surname;
           var docname = data.docname;
           var room = data.room;
        
           var name_msg = "Sr(a)." + "\n" + (name + '\n' + surname).toUpperCase();
           var msg  = '<p>'+ name_msg + ',' +'</p>' +
                      '<p>'+'pode se encaminhar para a sala de atendimento do(a)'+'</p>' 
                     +'<p>'+ 'Dr(a).' + '\n' + docname.toUpperCase() +'\n'+'na sala' + '\n'+ room + '</p>';
     
           var textEl = document.getElementById('mainText');
           textEl.innerHTML = msg;
           changeBackground(); // Display Message
           audio.play()
        }
}  


var timer;
function changeBackground(){
        if (timer)
           clearTimeout(timer);
 
        var header = document.getElementById('header');
	var textEl = document.getElementById('mainText');

        timer = setTimeout(() => {
                header.style.display='none';
		document.body.style.backgroundColor='transparent';
		textEl.style.color='transparent';
	}, 9000);
     
        document.body.style.backgroundColor='white';
	mainName.innerHTML = 'centro do sorriso'.toUpperCase();
	signal.innerHTML = "!";
	header.style.display='block';
        textEl.style.color='gray';
         
}

function init_widget(config) {
	if (!config) {
	     console.log("no json configuration found");
	     return;
	}
}

function start_widget() {
       fetch()
}

function stop_widget() {

}

function test_widget() {
    start_widget()
}
