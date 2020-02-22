function timecheck(){
    let now = new Date();
    let years = now.getFullYear();
    let months = now.getMonth()+1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if(months<10){
        months = '0'+months;
    }
    if(date<10){
        date = '0'+date;
    }
    if(hours<10){
        hours = '0'+hours;
    }
    if(minutes<10){
        minutes = '0'+minutes;
    }
    return `${years}.${months}.${date} ${hours}:${minutes}`;
}
document.querySelector('#submitbtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    
    xhr.onload = () =>{
        if(xhr.status == 200){
            location.reload();
        }else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST', '/board/post');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        content: document.querySelector('#content').value,
        timecheck:timecheck(),
    }))
});