
const key="e5908af9a9d4424c95e66dc740e30e94";
let html="";
let newsContainer=document.getElementById("newsContainer");
let searchText=document.getElementById("searchText");
let xhr=new XMLHttpRequest;
xhr.open('GET',`https://newsapi.org/v2/top-headlines?q=manchester&apiKey=${key}`,true);
xhr.onload=function(){
    if(xhr.status==200){
        let jsonData=JSON.parse(xhr.responseText);
        let articles= jsonData.articles;
        articles.forEach((element,index)=>{
            html+=` <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                    ${element.title}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                data-bs-parent="#newsContainer">
                <div class="accordion-body">
                    ${element.content}<a href="${element.url}" target="_blank"><br>Read more here</a>

                </div>
            </div>
        </div>`
        });
        newsContainer.innerHTML=html;
    }
    else{
        console.log("Some error occured");
    }
};
xhr.send();

// Searching a news : Using Regular Expression

searchText.addEventListener('input', function(){
    let textToSearch=searchText.value;
    const reg = new RegExp(textToSearch,'i');
    let newsCards= document.getElementsByClassName("accordion-item");
    let newsCardDescriptions = document.getElementsByClassName("accordion-body");
    Array.from(newsCards).forEach((element,index)=>{
        let description= newsCardDescriptions[index].innerText;
        if(reg.test(description)){
            // console.log("inside true")
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    });
    
});

