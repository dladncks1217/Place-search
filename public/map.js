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
document.getElementById('login').addEventListener('click',(e)=>{
    e.preventDefault();
    location.href = '/login';
});
document.getElementById('join').addEventListener('click',(e)=>{
    e.preventDefault();
    location.href = '/join';
});