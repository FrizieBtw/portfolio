var date = new Date();
var heure = date.getHours();
if (heure < 18) {
    document.getElementById("salut").innerHTML = 'Bonjour!';
}
else if (heure >= 18) {
    document.getElementById("salut").innerHTML = 'Bonsoir!';
}