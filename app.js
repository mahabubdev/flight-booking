/**===========================*
 * Assignment 04 - JS
 *===========================*/

 // taking all initial elements
 var from = document.getElementById('from');
 var to = document.getElementById('to');
 var depart = document.getElementById('dep');
 var returnd = document.getElementById('ret'); 

 var fClass = document.getElementById('fc');
 var eClass = document.getElementById('ec');

 var subTotal = document.getElementById('sub_total');
 var vat = document.getElementById('vat');
 var total = document.getElementById('total');

 var book = document.getElementById('book');

 var fcPlus = document.getElementById('fc-plus');
 var fcMinus = document.getElementById('fc-minus');
 var ecPlus = document.getElementById('ec-plus');
 var ecMinus = document.getElementById('ec-minus');


// global states
let sub_total_state = 0;
let cvat_state = 0;
let total_state = 0;

let fcPrice = 150;
let ecPrice = 100;

// setting intial states
fc.value = 0;
ec.value = 0;

var fcSeats = fc.value;
var ecSeats = ec.value;


// assign latest handled updates
subTotal.innerText = "$" + parseFloat(sub_total_state);
vat.innerText = "$" + parseFloat(cvat_state);
total.innerText = "$" + parseFloat(total_state);


// handle First class
fcPlus.addEventListener('click', function() {
    fc.value = parseFloat(fc.value) + 1;
    handleTotal();
});

fc.addEventListener('click', function(){
    if (fc.value <= 0) {
        this.value = 0;
    }
});

fcMinus.addEventListener('click', function() {
    if (fc.value <= 0) {
        return false;
    }
    fc.value = parseFloat(fc.value) - 1;
    handleTotal();
});


// handle Economic class
ecPlus.addEventListener('click', function() {
    ec.value = parseFloat(ec.value) + 1;
    handleTotal();
});

ec.addEventListener('click', function(){
    if (ec.value <= 0) {
        this.value = 0;
    }
});

ecMinus.addEventListener('click', function() {
    if (ec.value <= 0) {
        return false;
    }
    ec.value = parseFloat(ec.value) - 1;
    handleTotal();
});


// handle Total
function handleTotal () {
    fcSeats = fc.value;
    ecSeats = ec.value;

    let fcTotalPrice = parseFloat(fcPrice * fcSeats);
    let ecTotalPrice = parseFloat(ecPrice * ecSeats);

    sub_total_state = parseFloat(fcTotalPrice + ecTotalPrice);

    cvat_state = parseFloat((sub_total_state / 100) * 10);

    total_state = parseFloat(sub_total_state + cvat_state);

    // update visuals
    subTotal.innerText = "$" + sub_total_state;
    vat.innerText = "$" + cvat_state;
    total.innerText = "$" + total_state;
}


// handle book event
book.addEventListener('click', function(){
    // create a modal
    var myModal = document.createElement('div');
    myModal.classList.add('modal');

    // create contents
    var myJSX = `
        <div class="modal-content">
            <h1 class="modal-header">Flight is booked succesfully! <span>X</span></h1>
            <div class="infos">
                <p>From : ${from.value} ~ To : ${to.value}</p>
                <p>Departure : ${new Date(depart.value).toDateString()}</p>
                <p>Return : ${new Date(returnd.value).toDateString()}</p>
                <p>Seat : FC ${parseInt(fcSeats)} & EC ${parseInt(ecSeats)}</p>
                <p>Total Cost : ${"$" + parseFloat(total_state)} (including 10% VAT)</p>
            </div>
        </div>
    `;
    myModal.innerHTML = myJSX;

    document.body.appendChild(myModal);

    // disable modals
    document.querySelector('.modal .modal-header span').addEventListener('click', function() {
        myModal.remove();
    });
});

