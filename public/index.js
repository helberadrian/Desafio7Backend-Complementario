const socket = io.connect();
let date = new Date();

document.querySelector("#btn-enviar").addEventListener("click", () =>{
    const mensaje = document.querySelector("#mensaje").value;
    const correo = document.querySelector("#correo").value;
    console.log({correo: correo.value, date: date.getDate(), mensaje: mensaje.value});
    socket.emit("mensaje", {correo: correo, date: date.getDate(), mensaje: mensaje});
})


socket.on("mensaje_recibido", data =>{
    let mensajesHTML = "";
    data.forEach((element) => {
        mensajesHTML += `<tr><td id="correo"><strong>${element.correo}</strong></td><td id="date">${element.date}</td><td id="mensaje">${element.mensaje}</td></tr>`;
    });
    document.querySelector("tbody").innerHTML = mensajesHTML;
});