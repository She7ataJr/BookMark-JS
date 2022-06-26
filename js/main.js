
var NameInput = document.getElementById('NameInput');

var urlInput = document.getElementById('urlInput');

var addBtn=document.getElementById('addBtn');

var searchInput=document.getElementById('search');

arrBookmarks=[];
var currentIndex=0;


 if(localStorage.getItem('list')!=null) //3shan awl ma tbd2 tgeib mn local storage
 {
       arrBookmarks = JSON.parse(localStorage.getItem('list'));
       displayData(arrBookmarks)
 }
 else
 {
     arrBookmarks=[];

 }

addBtn.onclick=function(){
    if(addBtn.innerHTML=='update'){
    addBtn.innerHTML='add Product'
    var bookmark={
        name:NameInput.value,
        url:urlInput.value,
    }
    arrBookmarks.splice(currentIndex,1,bookmark)
    }
    else{
        var bookmark={
            name:NameInput.value,
            url:urlInput.value,
        }
        arrBookmarks.push(bookmark);
    }
    localStorage.setItem('list',JSON.stringify(arrBookmarks) );
    displayData(arrBookmarks)
    clearForm();
}


function clearForm() {
    
    NameInput.value = "";
    urlInput.value = "";
    addBtn.innerHTML="add product";
  }

function displayData(anything) { 
    var cartoona = ``;
    for(var i =0;i<anything.length; i++)
    {
        cartoona +=`<tr>
        <td>${anything[i].name}</td>
        <td><a href="${anything[i].url}"> <button  class="btn btn-outline-success">visit</button></a></td>
        <td> <button onclick="update(${i})" class="btn btn-outline-warning">update</button></td>
        <td> <button onclick="deleteData(${i})" class="btn btn-outline-danger">delete</button></td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona;
 }


function update(index){
    NameInput.value=arrBookmarks[index].name;
    urlInput.value=arrBookmarks[index].url;
    addBtn.innerHTML='update';
    currentIndex=index;

}

function deleteData (deletedIndex){
    arrBookmarks.splice(deletedIndex,1);
    localStorage.setItem('list',JSON.stringify(arrBookmarks))
    displayData(arrBookmarks);
} 

function search(term)
{
// console.log(term)
    var searchResult=[];
    for (var i =0 ; i<arrBookmarks.length; i++)
        if(arrBookmarks[i].name.toLowerCase().includes(term.toLowerCase())== true)
        {
            searchResult.push(arrBookmarks[i]);
        }
     displayData(searchResult)
   
    
}

function validateUrl(){
    var regex=/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (regex.test(urlInput.value)==true)
    {
        urlInput.classList.replace('is-invalid','is-valid')
        return true;
    }
    else
    {
        urlInput.classList.add('is-invalid')
        return false;
    }
}
function validateName(){
    var regex=/^[a-zA-Z ]{3,12}$/;
    if (regex.test(NameInput.value)==true)
    {
        NameInput.classList.replace('is-invalid','is-valid')
        return true;
    }
    else
    {
        NameInput.classList.add('is-invalid')
    }
}

urlInput.onkeyup=function(){
    if(validateUrl()){
        urlInput.classList.replace('is-invalid','is-valid')
        return true;
    }
    else{
        urlInput.classList.add('is-invalid')

    }
}
NameInput.onkeyup=function(){
    if(validateName()){
        NameInput.classList.replace('is-invalid','is-valid')
        return true;
    }
    else{
        NameInput.classList.add('is-invalid')
    }
}





//regex code for url 
// [(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)

