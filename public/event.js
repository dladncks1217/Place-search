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
    if(document.getElementById('nickname')){

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
    }else{
        NotLoginsearchfeature();
        document.getElementById('srchresult').textContent = document.getElementById('search').value;
        document.getElementById('search').value="";
    }
});

function enterkey(e) {
    if (window.event.keyCode == 13) {
         if(document.getElementById('nickname')){
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
        }else{
            NotLoginsearchfeature();
            document.getElementById('srchresult').textContent = document.getElementById('search').value;
            document.getElementById('search').value="";
        }
    }
};

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

if(document.getElementById('deleteall')){
    document.getElementById('deleteall').addEventListener('click',(e)=>{
        e.preventDefault();
        const deleteask = confirm('모든 검색결과를 삭제하시겠습니까?');

        if(deleteask){
            let xhr = new XMLHttpRequest();
            xhr.onload = ()=>{
                if(xhr.status === 200){
                    location.reload();
                }else{
                    console.error(xhr.responseText);
                }
            };
            xhr.open('DELETE','/history/all');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({
                nick:document.getElementById('nickname').textContent,
            }));
            location.href="/";
        }else{
            return;
        }
        
    });
}

if(document.getElementById('errorbtn')){
    document.getElementById('errorbtn').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/';
    })
}

if(document.getElementById('mypage')){
    document.getElementById('mypage').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href="/mypage";     
    })
};
