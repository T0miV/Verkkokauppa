/*Elementtien valinta Tuotteet ja Ostoskori sivuille */
const tuotteetEl = document.querySelector(".TuotteetSisalto");
const cartItemsEl = document.querySelector(".KoriSisalto");

function renderoiTuotteet(){
    TuotteetSisalto.forEach((product) => {
        tuotteetEl.innerHTML += ` 
                
        
        <div class="item">
            
            
            <div class="kuvat">
                <img src="${product.img}" alt=""  width="130" height="130" >
            </div>
    
            <div class="about">
                <h1 class="title">${product.name}</h1>
                <h3 class="subtitle">${product.subtitle}</h3>
                <img src="${product.saatavuus}"  width="10" height="10"> <b>Saatavilla</b>
            
            </div>
    
            <div class="hinnat">
                <h1 class id="summa">${product.summa}</h1>
            
            </div>
        
            <div class="lisaaOstoskoriin" onclick="lisaaOstoskoriin(${product.id});"><u>Lisää ostoskoriin</u></div>
            
        </div>    
    
    
        `;

    });
}
//Funktion kutsu renderöidäksesi tuotteet, tuotteet.html sivulle
renderoiTuotteet();

//Ostoskori array
let kori = JSON.parse(localStorage.getItem("KORI")) || [];
paivitaOstoskori();

//Tuotteiden lisäys ostoskoriin 
function lisaaOstoskoriin(id){
    //Tarkistaa onko tuote jo korissa.
    if(kori.some((item) => item.id === id)){

        alert("Tuote on jo korissa!")
    }
    else {
        const item = TuotteetSisalto.find((product) => product.id ===id);
        
        //Lisaa tuotelkm tiedon entisiin tietoihin
        kori.push({
            ...item,
            tuotelkm : 1,
            
        })
        notifikaatio();
        console.log(kori);
    }
    paivitaOstoskori(); 
}

//Ostoskorin päivittämiminen
function paivitaOstoskori(){
    
    //Tallenna kori selaimen muistiin
    localStorage.setItem("KORI", JSON.stringify(kori))
    
}

/*Konsoliin tulostus testi */
function lataaOstoskori(){
    
    console.log(kori)
}

//Notifikaatio toastr kirjastolla
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
    Command: toastr["success"]("Tuote on lisätty ostoskoriin!", "Ilmoitus")
}