function handleSend() {
  let formData = $("#formData").serializeArray();

  let dataToBeSent = {};
  formData.forEach((data) => {
    dataToBeSent[data.name] = data.value;
  });

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      new Noty({
        theme: "metroui",
        text: JSON.parse(xhttp.responseText)["message"],
        type: "warning",
        layout: "topRight",
        timeout: 2500,
      }).show();
      document.getElementById("loader").style.display = "none";
    }
  };
  xhttp.open("POST", "https://we-listen-server.herokuapp.com/message", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(dataToBeSent));
  document.getElementById("formData").reset();
}

function processForm(e) {
  document.getElementById("loader").style.display = "block";
  if (e.preventDefault) e.preventDefault();

  /* do what you want with the form */
  handleSend();
  // You must return false to prevent the default form behavior
  return false;
}

var form = document.getElementById("formData");
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}
