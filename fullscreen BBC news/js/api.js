const BBC_SCIENCE = 'https://www.bbc.com/portuguese/topics/cr50y580rjxt';
const BBC_ECONOMY = 'https://www.bbc.com/portuguese/topics/cvjp2jr0k9rt';
const BBC_HEALTH = 'https://www.bbc.com/portuguese/topics/c340q430z4vt';
const BBC_INTERNATIONAL = 'https://www.bbc.com/portuguese/topics/cmdm4ynm24kt';
const BBC_BRAZIL = 'https://www.bbc.com/portuguese/topics/cz74k717pw5t';

const URLS = [BBC_SCIENCE, 
              BBC_ECONOMY, 
              BBC_HEALTH,
              BBC_INTERNATIONAL,
              BBC_BRAZIL]

function displayPage(){ 
     var URL = URLS[Math.floor(Math.random() * URLS.length)];
     var $el = $('<iframe></iframe>');

     $.ajax({
         url: URL,
         method: 'GET',
         success: function(data) {
            var HTML = $el.html(data).get(0);
            var links = HTML.querySelector('.qa-story-image').srcset;
            var contentText = HTML.querySelector('#main-content').innerText;
            var headerText = HTML.querySelector('.lx-stream-post__header-text').innerText;
            var imageLink = links.split(', ').slice(-1)[0].split(' ')[0];
            document.body.style.backgroundImage = `${url(imageLink)}`;

            var layout = document.getElementById('layout');
            var content = document.getElementById('content');
            var header = document.getElementById('header');
            var logo = document.getElementById('logo');

            content.innerHTML=contentText;
            header.innerHTML=headerText;
            logo.src='bbc_logo.png';
            layout.classList.add('layoutStyle');
            adjustLayoutPosition();
       
      },
       error: function(xhr){
             console.warn('could not reach server');
             console.log('Retrying in 1 second...');
             window.t = setInterval(displayPage, 1000);
         }
     })
}

function adjustLayoutPosition(){
     var $layout = $('#layout');

     // Y-axis position
     var windowHeight = $(window).outerHeight(true); 
     var layoutHeight = $layout.css('height');
     layoutHeight = parseFloat(layoutHeight.split('px')[0]);
     var yaxisPosition = windowHeight - layoutHeight;
     $layout.css('top', yaxisPosition + 'px');  
}

function init_widget(config) {

}

function start_widget() {
  displayPage()
}

function stop_widget() {

}
  
function test_widget() {
  start_widget()
}

