const dds=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

for(let select of dds){
    for(cCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=cCode;
        newoption.value=cCode;
        if(select.name === "from" && cCode==="USD"){
            newoption.selected="selected";
        }else if(select.name === "to" && cCode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
    
const updateFlag= (element) =>{
    console.log(element)
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newsrc;
}

const message= document.querySelector(".msg");

const fromC= document.querySelector(".from select");

const toC= document.querySelector(".to select");

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtvalue= amount.value;
    if(amtvalue === ""|| amtvalue< 1){
        amtvalue=1;
        amount.value="1";
    }
    const URL=`${baseURL}/${fromC.value.toLowerCase()}.json`
    
    let responce = await fetch(URL);
    
    console.log(responce);
    let json = await responce.json();
    console.log(json);
    let rate = json[fromC.value.toLowerCase()][toC.value.toLowerCase()];

    let finalamt=amtvalue*rate;
    message.innerText=`${amtvalue} ${fromC.value}=${finalamt} ${toC.value}`
});