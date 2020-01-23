document.querySelector('#search').focus();
document.getElementById('searchbtn').addEventListener('click', (e) => {
    e.preventDefault();
    searchfeature();
    document.getElementById('srchresult').textContent = document.getElementById('search').value;
    document.getElementById('search').value="";
});
function enterkey(e) {
    if (window.event.keyCode == 13) {
        searchfeature();
        document.getElementById('srchresult').textContent = document.getElementById('search').value;
        document.getElementById('search').value="";
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