// Structure 
function createSection(element, key){
    let section = document.createElement('section');
    let unorderenList = document.createElement('ul');
    section.id = key;
    unorderenList.setAttribute('data-title', element.label);
    element.links.forEach(link => {
        let item = document.createElement('li');
        let site = document.createElement('a');
        site.textContent = link.name;
        site.href = link.url;
        item.appendChild(site);
        unorderenList.appendChild(item);
    });
    section.appendChild(unorderenList)
    return section;
}

function createNavigation(){
    Object.keys(sections).forEach(key => {
        navegation.appendChild(createSection(sections[key], key));
    });
}

// Clock
function currentTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    header.textContent =  day + " / " + month + " - " + hour + " : " + min + " : " + sec;
    setTimeout(function(){
        currentTime() 
    }, 1000);
}

function updateTime(k) {
    if (k < 10) return "0" + k;
    return k;
}

// Cover
function loadCover(){
    let indexCover = Math.floor(Math.random() * covers.length);
    cover.style.background = 'url(covers/'+covers[indexCover]+')';
    cover.style.backgroundPosition = 'center';
    cover.style.backgroundRepeat = 'no-repeat';
    cover.style.backgroundSize = 'cover';
}

// Search engine (first find first search)
function search(){
    let uriSubmit = '';
    let typing = input.value.trimStart();
    let operator = typing.charAt(0).toLowerCase();
    let text = typing.substring(2).trim();
    let arrObjsLinks = [];
    Object.keys(sections).forEach(key => {
        for (const link of sections[key].links) {
            arrObjsLinks.push(link);
        }
    });
    let mapOperatorToLink = createMap(arrObjsLinks);
    let hasOperator = mapOperatorToLink.has(operator);
    if(typing.charAt(1) == ' ' && hasOperator){
        let link = mapOperatorToLink.get(operator)
        let hasUri = link.hasOwnProperty('uri');
        if(!hasUri || text.length == 0){
            uriSubmit = link.url;
        }else{
            uriSubmit = link.uri + text;
        }
    }else{
        typing.trim() == '' ? 
            uriSubmit = "https://www.google.com" : 
            uriSubmit = "https://www.google.com/search?q=" + typing.trim();
    }
    window.location.href = uriSubmit;
}

function createMap(links){
    let map = new Map();
    links.forEach(link => {
        let key = link.name.substring(0,1).toLowerCase();
        if(!map.has(key)){
            if(link.hasOwnProperty('uri')){
                map.set(key, {
                    url: link.url,
                    uri: link.uri
                });
            }else{
                map.set(key, {
                    url: link.url
                });
            }
            
        };
    });
    return map;
}

// Quotes
function createQuote(){
    let indexQuote = Math.floor(Math.random() * quotes.length);
    let objQuote = quotes[indexQuote];
    let quotePerse = objQuote.quote;
    let authorPerse = objQuote.author;
    quote.textContent = '"' + quotePerse + '"';
    author.textContent = '- ' + authorPerse;
}

// Links behaviour
function enableSelect(e){
    if(e.target.tagName == 'A'){
        sites.forEach(s => {s.style.color = '#888888'});
        e.target.style.color = '#ffffff';
    }
}

function disableSelect(e){
    sites.forEach(s => {
        s.style.color = '#ffffff';
    });
}

// Defer
function defer(){
    if(document.readyState == 'complete'){
        main = document.getElementsByTagName('main')[0];
        navegation = document.getElementsByTagName('nav')[0];
        header = document.getElementsByTagName('header')[0];
        cover = document.getElementsByTagName('div')[0];
        quote = document.getElementsByTagName('blockquote')[0].children[0];
        author = document.getElementsByTagName('figcaption')[0];
        input = document.getElementsByTagName('input')[0];
        input.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') search();
        });
        createNavigation();
        loadCover();
        currentTime();
        createQuote();
        sites = [...document.getElementsByTagName('a')];
        navegation.addEventListener('mouseover', enableSelect);
        navegation.addEventListener('mouseout', disableSelect);
    }
}
document.addEventListener('readystatechange', defer);