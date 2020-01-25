function timecheck(){
    let now = new Date();
    let years = now.getFullYear();
    let months = now.getMonth()+1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    return `${years}년 ${months}월 ${date}일 ${hours}시 ${minutes}분`;
}
document.querySelector('#search').focus();
document.getElementById('searchbtn').addEventListener('click', (e) => {
    e.preventDefault();
    searchfeature();
    document.getElementById('srchresult').textContent = document.getElementById('search').value;
    document.getElementById('search').value="";


    let xhr = new XMLHttpRequest();
    xhr.onload = ()=>{
        if(xhr.status === 200){
            location.reload();
        }else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST','/history');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({
        history:document.getElementById('srchresult').textContent, 
        time:timecheck(),
        nick:document.getElementById('nickname').textContent,
    }));
});

function enterkey(e) {
    if (window.event.keyCode == 13) {
        searchfeature();
        document.getElementById('srchresult').textContent = document.getElementById('search').value;
        document.getElementById('search').value="";

        let xhr = new XMLHttpRequest();
        xhr.onload = ()=>{
            if(xhr.status === 200){
                location.reload();
            }else{
                console.error(xhr.responseText);
            }
        };
        xhr.open('POST','/history');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify({
            history:document.getElementById('srchresult').textContent, 
            time:timecheck(),
            nick:document.getElementById('nickname').textContent,
        }));
    }
}
if(document.getElementById('login')){
    document.getElementById('login').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/login';
    });
}
if(document.getElementById('join')){
    document.getElementById('join').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/join';
    });
}
if(document.getElementById('logout')){
    document.getElementById('logout').addEventListener('click',(e)=>{
    e.preventDefault();
    location.href='/login/logout';
});
}