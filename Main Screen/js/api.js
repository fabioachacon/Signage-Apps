const URL_DOLLAR = 'https://www.melhorcambio.com/dolar-hoje';
const URL_NASDAQ = 'https://br.advfn.com/bolsa-de-valores/nasdaq/NDAQ/cotacao';
const URL_BOVESPA = 'http://cotacoes.economia.uol.com.br/bolsas/cotacoes-historicas.html?indice=.bvsp';
const CLOCK_URL = 'https://www.horariodebrasilia.org/';
const WEATHER_URL = 'https://www.climatempo.com.br/previsao-do-tempo/agora/cidade/256/joaopessoa-pb';
const WEATHER = 'https://www.climatempo.com.br/';
const ACCUWEATHER = 'https://www.accuweather.com/en/br/joão-pessoa/34631/weather-forecast/34631';
const DAYWEEK = 'https://time.is/pt_br/Brasília';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
var finID;
var timeID;
var weatID;

function adjustElements(){
    var windowWidth = $(window).outerWidth(true);
    var windowHeight = $(window).innerHeight(true);

    var barHeight = $("#black_bar").css('height');
    var barTop = windowHeight - barHeight;
    var videoHeight = windowHeight - barHeight;
    var $viEl = $('#video');
    var barEl = $('#black_bar'); 
    $viEl.css("width", `${windowWidth + 70}px`);
    $viEl.css("height", `${videoHeight}px`);
    barEl.css('width', `${windowWidth + 70}px`);
    // barEl.css('top', `${barTop}px`)
}
           
function getFinancial(){
    clearTimeout(finID);

    $eldolar = $('<iframe></iframe>');
    $.ajax({
        url: `${PROXY_URL}${URL_DOLLAR}`,
        method: 'get',
        success: function(data){
                var page = $eldolar.html(data).get(0); 
                var target = page.querySelector('#comercial');
                var dollarPrice = target.value;

                var dollarEl = document.getElementById('dollarPrice');
                dollarEl.innerHTML=dollarPrice;
            },
            error: function(xhr){
                console.log("couldn't reach server!");
            }  
    });

    $elnasd = $('<iframe></iframe>');
    $.ajax({
        url: `${PROXY_URL}${URL_NASDAQ}`,
        method: 'get',
        success: function(data){
                var page = $elnasd.html(data).get(0);
                var target = page.querySelector('#qs-current-change');

                var nasdaqVar = document.getElementById('nasdaqPrice');
                var value = target.innerText.split(' ')[0];
                value = parseFloat(value.replace(',', '.'));
                var col = value < 0 ? 'red' : 'green';
                nasdaqVar.innerHTML=target.innerText;
                nasdaqVar.style.color=col;
            },
            error:function(xhr){
                console.log("couldn't reach server!");
                }
    })

    $elbov = $('<iframe></iframe>');
    $.ajax({
        url: `${PROXY_URL}${URL_BOVESPA}`,
        method: 'get',
        success: function(data){
                var page = $elbov.html(data).get(0);
                var target = page.querySelector('#infoTable > table > tbody > tr > td:nth-child(4)');

                var bovPrice = document.getElementById('bovespaPrice');
                var number = target.innerText.split('%')[0];
                number = parseFloat(number.replace(',', '.'));
                var col = number < 0 ? 'red' : 'green';
                var plussSign = number > 0 ? '+' : '';
                bovPrice.innerHTML=plussSign+target.innerText+"%";
                bovPrice.style.color=col;

                },
                error:function(xhr){
                    console.log("couldn't reach server!");
            }
        })
        finID = setTimeout(getFinancial, 60000 * 5);
      }
        
function getWeather(){
    clearTimeout(weatID);

    $currEl = $('<iframe></iframe>');
    $.ajax({
        url: `${PROXY_URL}${WEATHER_URL}`,
        method: 'get',
        success: function(data){
            var page = $currEl.html(data).get(0);
            var tempEl = page.querySelector('._center');
            var iconEl = page.querySelector('._height-80');
            var iconPath = iconEl.src.split('///')[1];
            var iconURL = `${WEATHER}${iconPath}`;

            var icon = new Image();
            icon.id='icon';
                
            var weatherEl = document.getElementById('weather');
            var currentTemp = tempEl.innerText.split("\n")[1];
            weatherEl.innerHTML = currentTemp;
                    
            icon.src = iconURL;
            weatherEl.appendChild(icon);
            console.log(weatherEl); 
            },
            error: function(xhr){
                console.log("couldn't reach server");
            }
        })
        weatID = setTimeout(getWeather, 60000 * 10);
    }
    
function getAccWeather(){
    clearTimeout(window.t);
    $el = $('<iframe></iframe>');
    $.ajax({
        url: `${PROXY_URL}${ACCUWEATHER}`,
        method: 'get',
        success: function(data){
            var page = $el.html(data).get(0);
            var tempEl = page.querySelector('.temp');
            var iconEl = page.querySelector('.weather-icon');
            var iconURL = iconEl.src;
            console.log(iconURL);
        },
        error: function(xhr){
            console.log(xhr)
        }
    })
    window.t = setTimeout(getAccWeather, 2000);
}
        
function getTime(){
    clearTimeout(timeID);
    getCurrentHour();
    timeID = setTimeout(getTime, 500);
}

function getDay(){
    var days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    var time = new Date();
    var dayName = days[time.getDay()];
    var day = checkTime(time.getUTCDate());
    var month = checkTime(time.getUTCMonth());
    var dayMonth = [day, month].join('/')
    var paraDay = document.getElementById('paraDay');
    var paraMonth = document.getElementById('paraMonth')
    paraDay.innerHTML = dayName;
}

function getCurrentHour(){
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    m = checkTime(m);
    h = checkTime(h);
    var currentHour = h + ":" + m;
    var hourEl = document.getElementById('time');
    hourEl.innerHTML=currentHour;
    if(currentHour === "00:02"){
        getDay()
    }
}

function checkTime(time){
    if (time < 10) {time = "0" + time};
    return time;
}

var count=1;
function playList(){
    var player = document.getElementById('video');
    var video = document.getElementById('mp4Video');
    player.addEventListener('ended', myHandler, false);

    function myHandler(e)
    {
        setTimeout(() => {
            if(!e) 
            {
                e = window.event; 
            }
            //document.getElementById('newsframe').remove();
            document.getElementById('newsframe').style.display='none'
            player.style.display='block';
            count++;
            $(video).attr('src', "video/video"+count+".mp4");
            player.load();
            player.play();
        }, 10000);
        newsEvent();
        document.getElementById('newsframe').style.display='block'
        player.style.display = 'none'
    }
}

function newsEvent(){
    var newsFrame = document.createElement('iframe');
    newsFrame.src = 'news/index.html';
    newsFrame.id = 'newsframe';
    newsFrame.frameBorder = 0;

    var windowHeight = $(window).outerHeight();
    var windowWidth = $(window).outerWidth();

    var barHeight = $('#black_bar').outerHeight(true);
    var frameHeight = windowHeight - barHeight;

    $(newsFrame).css({'height': `${frameHeight + 15}px`,
                      'width': `${windowWidth + 70}px`});
    
    // document.body.appendChild(newsFrame);
    document.body.insertBefore(newsFrame, document.body.firstChild)
}

function loadBar(){
    getDay();
    getFinancial();
    getWeather();
    getTime();
}
        
function load(){
    adjustElements();
    loadBar();
    playList();
    //getAccWeather()
}
