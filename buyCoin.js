//Assign global veriable for calculating rate of profit
var totalPaid=0;
var totalEarned=0;
// Assign buttons (buy and sell)
document.getElementById("buyit").onclick = buy;
function buy() {
    var which="buy";
    readData(which);
}
document.getElementById("sellit").onclick = sell;
function sell(){
    var which="sell";
    readData(which);
}
// reading data and button's functions
function readData(which){
    var price;
	var header="2AB81F30-2612-4550-A7A9-7133313AE493";
	// F52C9503-FE0F-4968-A3B2-B97F23183570   It's my api; if requests executed limit was exceeded , you can use this one.
    const xhr = new XMLHttpRequest();
	var inputAmount = document.getElementById("amountID").value;
	var inputType = document.getElementById("typeCoin").value;
    xhr.open("GET", "https://rest.coinapi.io/v1/exchangerate/"+inputType.toUpperCase()+"/USD?apikey="+header,true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if ((this.status == 200) && (this.status < 300)) {
            obj = JSON.parse(this.responseText);
            price=obj['rate'];
            if(which==="buy"){
				// After buying ,added to wallet
                var markup = "<tr><td><input type='checkbox' name='record'></td><td>" +inputType.toUpperCase()+"</td><td>"+ inputAmount + "</td><td>" + inputAmount*price + "</td><td>" +"None"+"</td><td>"+ "None" + "</td></tr>";
                $("table tbody").append(markup);
            }
			else{
				//After selling ,Mark as sold and calculate profit 
				$("table tbody").find('input[name="record"]').each(function(){
                if($(this).is(":checked")){
					if(this.parentNode.parentNode.cells[4].innerHTML ==="None"){
						var amount = this.parentNode.parentNode.cells[2].innerHTML;
						var buyedPrice = this.parentNode.parentNode.cells[3].innerHTML;	
						var earned=(price * amount);
						var result= earned - buyedPrice;
						this.parentNode.parentNode.cells[5].innerHTML = result;
						this.parentNode.parentNode.cells[4].innerHTML = (earned);
						calculateTotalProfit(result); 
						calculateRate(earned,buyedPrice);
					}else{
						alert("You have already selled.");
					}
                }
            });
			}
        }
		else{
			// Show error message about input which is type of coins.
			alert("The type of coin you are looking for was not found.");
		}
      }
    }

}
//profit or loss is calculated as the amount of money

function calculateTotalProfit(result){
	var totalProfit = document.getElementById("totalProfit").innerHTML;
	totalProfit= (totalProfit*1)+(1*result);
	document.getElementById("totalProfit").innerHTML=totalProfit;	
}
//profit or loss is calculated as a percentage

function calculateRate(earned,buyedPrice){
	totalPaid=(totalPaid*1)+(1*buyedPrice);
	totalEarned=(1*totalEarned)+(1*earned);
	var rateProfit = document.getElementById("rateProfit").innerHTML;
	document.getElementById("rateProfit").innerHTML=((totalEarned-totalPaid)/totalPaid)*100;
}
