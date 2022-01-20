var Articles;
var ShoppingCar= [];
var spanContador=document.getElementById("itemsNumber");
var number=document.createTextNode(`${ShoppingCar.length}`);
spanContador.appendChild(number);
var search_button=document.getElementById("searchButton");
var search_input=document.getElementById("searchbo");
var reset_button=document.getElementById("ResetButtom");
var buy_Button=document.getElementById("BuyButtom");
var obj;

function getData(){
    var req = new XMLHttpRequest();
    req.open('GET', './buyOffer/script/db.json', true); 
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            obj = JSON.parse(req.responseText);
            display(obj)
        } else {
            
            }
        };
        req.send(null);
}



function display(obj){
    const catalogue=document.getElementById("catalogue");
    for(let i=0 ; i<obj.length; i++){
        var NItem = 0;
        const newElement= document.createElement("div");
        newElement.className="newElement";
        newElement.id=obj[i].id;
        /*newElement.onclick = function() { VerifyCheckDiv(newElement)};*/
        newElement.addEventListener("click", function(){VerifyCheckDiv(newElement,quantityInput,NItem,this.id,obj)});
        // Today I have learned that I need to call a function like a reference of other function and with this
        // the function will not fired before the action that in this case is "click". Great Day.
        catalogue.appendChild(newElement);
        //create the image
        const anchorImage=document.createElement("a");
        anchorImage.className="anchorObject";
        newElement.appendChild(anchorImage);
        const divImage=document.createElement("div");
        divImage.className="DivImage";
        anchorImage.appendChild(divImage);
        const imageArticle=document.createElement("img");
        imageArticle.className="imageArticle";
        imageArticle.src=`./images/${obj[i].Image}`;
        divImage.appendChild(imageArticle);
        //create the price
        const PriceElement=document.createElement("a");
        PriceElement.className="Price";
        newElement.appendChild(PriceElement);
        const PriceText=document.createTextNode(`$${obj[i].Precio}`);
        PriceElement.appendChild(PriceText);
        //create buttom -
        const ButtonLess= document.createElement("button");
        ButtonLess.className="lessButton";
        const ID=ButtonLess.id=`less_${obj[i].id}`;
        ButtonLess.type='button';
        ButtonLess.innerHTML="-";
        ButtonLess.addEventListener("click", function(){lessItem(obj,obj[i].id,quantityInput,NItem)});
        newElement.addEventListener("click", function(){ButtonChecked(ButtonLess,quantityInput)});
        newElement.appendChild(ButtonLess);
        ButtonLess.addEventListener("mouseover",addClass);
        ButtonLess.addEventListener("mouseleave",removeClass);
        //create the input
        const quantityInput = document.createElement("input");
        quantityInput.setAttribute("type","number");
        quantityInput.setAttribute("value",NItem);
        quantityInput.setAttribute("name",`quantity_${obj[i].id}`);
        quantityInput.className="quantityInput";
        quantityInput.id=`quantity_${obj[i].id}`;
        quantityInput.disabled=true;
        quantityInput.addEventListener("change", function(){InputChange(quantityInput,newElement)} )
        newElement.appendChild(quantityInput);
        //create buttom +
        const ButtonAdd= document.createElement("button");
        ButtonAdd.className="addButton";
        ButtonAdd.id=`${obj[i].id}`;
        ButtonAdd.type='button';
        ButtonAdd.innerHTML="+";
        ButtonAdd.addEventListener("click", function(){AddItem(obj,obj[i].id,quantityInput,NItem,newElement)});
        newElement.appendChild(ButtonAdd);  
        ButtonAdd.addEventListener("mouseover",addClass);
        ButtonAdd.addEventListener("mouseleave",removeClass);
        //create the name
        const DivNombre= document.createElement("a");
        DivNombre.className="NameArticle";
        DivNombre.id=`Article_${obj[i].id}`;
        newElement.appendChild(DivNombre);
        const NombreText=document.createTextNode(`${obj[i].Nombre}`);
        DivNombre.href="https://www.mercadolibre.com.ar/";
        DivNombre.appendChild(NombreText);
        DivNombre.addEventListener("mouseover",addClass);
        DivNombre.addEventListener("mouseleave",removeClass);

        function addClass(){
            if (newElement.className=="newElement"){
                newElement.className="newElement-Unhover";
            }
            
        
          }
        function removeClass(){
            if (newElement.className=="newElement-Unhover"){
            newElement.className="newElement";
            }
        }

    }
    return obj;
}

function VerifyCheckDiv(article,quantityInput,NItem,id,obj){
    if (article.className==="newElement"){
        article.className = "ElementChecked";
        ShoppingCar.push(obj[id]);
        NItem ++;
        quantityInput.value=NItem;
        number.textContent=ShoppingCar.length;        
       
    }else if (article.className === "ElementChecked" && quantityInput.value==0){
        article.className = "newElement";
        number.textContent=ShoppingCar.length;
    }
    
}

function AddItem(obj,id,quantityInput,NItem,article){
    NItem=document.getElementById(`quantity_${id}`).value;
    ShoppingCar.push(obj[id]);
    NItem ++;
    quantityInput.value = NItem;
    number.textContent=ShoppingCar.length;
    article.className = "ElementChecked";
}
function lessItem(obj,id,quantityInput,NItem){
    NItem=document.getElementById(`quantity_${id}`).value;
    ShoppingCar.pop(obj[id]);
    NItem -- ;
    number.textContent=ShoppingCar.length;
    if (NItem > -1){
        quantityInput.value=NItem;
    }
}



function ButtonChecked(buttom,quantityInput){
    if (buttom.className==="lessButton"){
        buttom.className = "lessButtonChecked";
    }else if (buttom.className === "lessButtonChecked" && quantityInput.value==0){
        buttom.className = "lessButton";
    }else if (buttom.className === "addButton"){
        buttom.className = "addButtonChecked";
    }else if (buttom.className === "addButtonChecked" && quantityInput.value==0){
        buttom.className = "addButton";
    }
}

window.onload = getData();

/* navBar */
search_button.addEventListener("click", function(){ search(obj) });

search_input.addEventListener("keyup", function(){ addMayus(search_input) });

search_input.addEventListener('keyup', function(){ search(obj) });


function addMayus(search_input){
    words= search_input.value.split(" ");
    words_capitalized = [];
    for (let i=0; i<words.length; i++){
        var firstLetter = words[i].slice(0,1);
        var capitalized = words[i].replace(firstLetter,firstLetter.toUpperCase());
        words_capitalized.push(capitalized);
    }
    search_input.value=words_capitalized.join(" ");
}

function search(obj){
    for(let i=0; i<obj.length; i++){
        if (obj[i].Tipo_de_Articulo.includes(search_input.value)){
            document.getElementById([i]).className="newElement";
        
        }
        else if (obj[i].Nombre.includes(search_input.value)){
            document.getElementById([i]).className="newElement";
            
        }
        else{document.getElementById(i).className="elementHide";
        }
        
    }

    
}
let body=document.getElementsByTagName("body")[0];
let logIn_singUp=document.querySelector(".logIn");
let Registration_Windows=document.querySelector(".WindowsModal");
logIn_singUp.addEventListener("click",function(){
    body.style.overflow="hidden";
    Registration_Windows.style.display="grid"});

let SignIn_button=document.querySelector(".SingIn");
let SignUp_button=document.querySelector(".SingUp");
let Formulario_SingIn=document.querySelector(".Formulario_SingIn");
let Formulario_SingUp=document.querySelector(".Formulario_SingUp");
SignUp_button.addEventListener("click",function(){
    SignIn_button.className="Registration SingIn";
    Formulario_SingIn.style.display="none";
    SignUp_button.className="Registration SingUp pressed";
    Formulario_SingUp.style.display="grid";
});

SignIn_button.addEventListener("click",function(){
    SignIn_button.className="Registration SingIn pressed";
    SignUp_button.className="Registration SingUp";
    Formulario_SingIn.style.display="grid";
    Formulario_SingUp.style.display="none";
});


let PseudoElement=document.querySelector(".pseudoelement");
PseudoElement.addEventListener("click",function(){ 
Registration_Windows.style.display="none";
body.style.overflow="scroll";
});


/*final buttons*/

function resetBuy(ShoppingCar,number){ 
    let NItem=document.getElementById("itemsNumber").textContent;
    for (let i=0; i<obj.length;i++){
        let quantity=document.getElementById(`quantity_${i}`);
        quantity.value=0;
        let article=document.getElementById(`${i}`);
        article.className="newElement";
        let lessButton=document.getElementById(`less_${i}`);
        lessButton.className="lessButton";
        let id=obj[i].id;
        ShoppingCar.pop(obj[id]);
        
    }
    number.textContent=ShoppingCar.length;
  
}

function Buy(){
    let request = window.indexedDB.open('Shopping_Cart', 1);
    window.location.href = "http://www.google.com";
}

function displayShopCarDetail(){
    let ShopCarDetail_Wrapper=document.querySelector(".ShopCarDetail");
    for (i=0;i<ShoppingCar.length;i++){
        const Car_Item=document.createElement("div");
        Car_Item.className="CarItem";
        const Img_Item=document.createElement("img");
        Img_Item.className="CarItem_img";
        
    }
}


reset_button.addEventListener("click", function(){ resetBuy(ShoppingCar,number) });
buy_Button.addEventListener("click",function(){Buy(ShoppingCar)})
