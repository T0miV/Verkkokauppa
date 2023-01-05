//Local storagesta tiedon hakeminen
let kori = JSON.parse(localStorage.getItem("KORI")) || [];

//Html kohdat johon renderöidään
const cartItemsEl = document.querySelector(".KoriSisalto");
const subtotalEl = document.querySelector(".subtotal");

//Ostosten renderöinti ostoskori.html sivulle
function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    kori.forEach((product) => {
      cartItemsEl.innerHTML += ` 
                
        
      <div class="item">
          <div class="kuvat">
              <img src="${product.img}" alt=""  width="130" height="130" >
          </div>
  
          <div class="about">
              <h1 class="title">${product.name}</h1>
              <h3 class="subtitle">${product.subtitle}</h3>
          </div>
  
          <div class="hinnat">
              <h1 class id="summa">${product.summa}</h1>
          
          </div>

          <div class="units">

          <div class="btn plus" onclick="TuotteidenLkm('plus',${product.id})">+</div>  
            <div class="number">${product.tuotelkm}</div>
            <div class="btn minus" onclick="TuotteidenLkm('minus',${product.id})">-</div>  
         </div>

         
         <div class="poista" onclick="poistaKorista(${product.id});notifikaatio();">Poista tuote ostoskorista</div>  
           

      </div>   
       
  
      `;
      
    });
}

renderCartItems();


//Ostoskorin pävitys, rendreröi tuotteet ja kokonaishinnan
function updateCart() {
    renderCartItems();
    renderSubtotal();
    

    localStorage.setItem("Ostoskori", JSON.stringify(kori))
}  

//Tuotteiden kokonaishinta
function renderSubtotal() {
    let totalPrice = 0,
      totalItems = 0;
  
    kori.forEach((item) => {
        if (item.id == 0){

            totalPrice += 200 * item.tuotelkm;
            totalItems += item.tuotelkm;
        }
        else if (item.id == 1){

            totalPrice += 50 * item.tuotelkm;
            totalItems += item.tuotelkm;
        }
        else if (item.id == 2){

            totalPrice += 2000 * item.tuotelkm;
            totalItems += item.tuotelkm;
        }
        else if (item.id == 3){

            totalPrice += 15000 * item.tuotelkm;
            totalItems += item.tuotelkm;
        }
        else if (item.id == 4){

            totalPrice += 130 * item.tuotelkm;
            totalItems += item.tuotelkm;
        }
    });
  
    subtotalEl.innerHTML = `Yhteensä (${totalItems} tuotetta): ${totalPrice.toFixed(1) + "€"}`;
    
   
  }

/*Tuotteiden määrän valinta*/

function TuotteidenLkm(action, id) {
    kori = kori.map((item) => {
      let tuotelkm = item.tuotelkm;
  
      if (item.id === id) {
        if (action === "minus" && tuotelkm > 1) {
          tuotelkm--;
        } else if (action === "plus") {
          tuotelkm++;
        }
      }
  
      return {
        ...item,
        tuotelkm,
      };
    });
  
    updateCart();
}

 //Tuotteiden poistaminen

 function poistaKorista(id) {
  kori = kori.filter((item) => item.id !== id);
  localStorage.setItem("KORI", JSON.stringify(kori))

  updateCart();
}



//tyhjentää koko ostoskorin
 function tyhjennakaikki(){
  
  localStorage.clear(); 
  updateCart();
  location.reload();
  
 
}

//ostoskorin tyhjennys alert
 function notifikaatio(){
    
  
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-full-width",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  Command: toastr["warning"]("Tuote on poistettu ostoskorista.", "Ilmoitus")
      
}

//Ilmoitus kun tilaus lähetetään
function notifikaatio2(){
    
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  Command: toastr["success"]("Tilauksesi on lähetetty!")
      
}
  
