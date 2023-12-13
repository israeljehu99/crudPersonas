const contenido = document.getElementById('contenido');
const xmla  = new XMLHttpRequest();
xmla.open('GET','cabecera.html',true);
xmla.addEventListener('readystatechange',()=>{
    if (xmla.status === 200 && xmla.readyState ===4) {
        contenido.innerHTML = xmla.responseText;
    }
});
xmla.send();