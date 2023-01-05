//Random koira faktan tulostaminen

const haeKoira = () => {
    fetch(`https://dog-api.kinduff.com/api/facts`)
    .then((Response) => Response.json())
    .then((koiraData) =>{
        
        document.getElementById("viesti").innerHTML = koiraData.facts
        console.log(koiraData.message)
            
    })


}

//Random kuvan lisäys
const haeKuva = () => {
    
    document.getElementById('kuva').src = 'https://picsum.photos/'+(800+rand())+'/' + (300 + rand()) +'?random=1';}
    function rand(){ return Math.floor(Math.random() * 90)
};






