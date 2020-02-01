document.querySelector('#changebtn').addEventListener('click',(e)=>{
    e.preventDefault();

    let firstnick = document.querySelector('#nick').textContent;
    

    let xhr = new XMLHttpRequest();
    xhr.onload = () =>{
        if(xhr.status === 200){
            location.reload();
        }else{
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST','/mypage/changenick');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({nick:document.querySelector('#changenick').value, firstnick:firstnick}));

    document.querySelector('#nick').value = document.querySelector('#changenick').value;
    document.querySelector('#changenick').value = "";
});