let submitBtn = document.getElementById('submitButton')
let form = document.getElementById('formRegister')

submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    let sendObject={};
    let data = new FormData(form);
    data.forEach((value,key)=>sendObject[key]=value);
    console.log(sendObject)
})
