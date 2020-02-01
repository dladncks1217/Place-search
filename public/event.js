// 시간확인용
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

// 로그인상태서 검색기록저장
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
    // 비로그인시
    }else{
        NotLoginsearchfeature();
        document.getElementById('srchresult').textContent = document.getElementById('search').value;
        document.getElementById('search').value="";
    }
});

// 엔터키사용(로그인시, 검색기록저장)
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
        // 비로그인시    
        }else{
            NotLoginsearchfeature();
            document.getElementById('srchresult').textContent = document.getElementById('search').value;
            document.getElementById('search').value="";
        }
    }
};
// 로그인라우터이동
if(document.getElementById('login')){
    document.getElementById('login').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/login';
    });
}
// 회원가입라우터 이동
if(document.getElementById('join')){
    document.getElementById('join').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/join';
    });
}
// 로그아웃
if(document.getElementById('logout')){
    document.getElementById('logout').addEventListener('click',(e)=>{
    e.preventDefault();
    location.href='/login/logout';
    });
}
// 검색기록 삭제
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
// 에러페이지
if(document.getElementById('errorbtn')){
    document.getElementById('errorbtn').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href = '/';
    })
}
// 마이페이지 라우터 이동
if(document.getElementById('mypage')){
    document.getElementById('mypage').addEventListener('click',(e)=>{
        e.preventDefault();
        location.href="/mypage";     
    });
}

// 즐겨찾기 추가/제거 기능
if(document.getElementById('favoritebtn')){
    document.getElementById('favoritebtn').addEventListener('click',(e)=>{
        preventDefault();
        // 추가
        if(document.getElementById('favoritebtn').value == "☆"){
            document.getElementById('favorite').value = "★";

            let xhr = new XMLHttpRequest();
            xhr.onload = ()=>{
                if(xhr.status === 200){
                    location.reload();
                }else{
                    console.error(xhr.responseText);
                }
            };
            xhr.open('POST','/favorite/add');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({
                favorite:document.getElementById('srchresult').value
            }));

        // 제거
        }else if(document.getElementById('favoritebtn').value == "★"){ 
            document.getElementById('favorite').value = "☆";

            let xhr = new XMLHttpRequest();
            xhr.onload = ()=>{
                if(xhr.status === 200){
                    location.reload();
                }else{
                    console.error(xhr.responseText);
                }
            };
            xhr.open('POST','/favorite/remove');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({
                favorite:document.getElementById('srchresult').value
            }));
        }

    });
}