import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public listArray = [];
  public dataIndex = 0;
  public inputValue = "";

  constructor() {}

  ngOnInit(){
    this.listItems();
  }
  
  listItems() {
    if (localStorage.getItem("New Query") == null) { //Jos local storagessa ei ole dataa
      this.listArray = []; //Luodaan tyhjä array
    } else {
      this.listArray = JSON.parse(localStorage.getItem("New Query")); //Lisätään itemit local storagelta
    }
    this.inputValue="";   
  }

  async getCases() { // Haetaan rajapinnalta data hakusanan perusteella
    var value = this.inputValue;
    await fetch("https://api.covid19api.com/country/"+value+"/status/confirmed/live")
    .then(response => response.json())
    .then(data =>{
      this.listArray.push((data[data.length-1].Country)+": "+(data[data.length-1].Cases)+" "+(data[data.length-1].Status) +" cases as of "+(data[data.length-1].Date).slice(0,-10)+"."); //Lisätään uusi arvo arrayhin
      localStorage.setItem("New Query", JSON.stringify(this.listArray)); //Itemin lisäys local storageen
      this.listItems(); //Kutsutaan listItems-funktiota
    })
    .catch(err => window.alert(err))
  }
  
  // Remove item -funktio
removeItem(index) {
    this.listArray = JSON.parse(localStorage.getItem("New Query"));
    this.listArray.splice(index, 1); //Poistetaan li
    localStorage.setItem("New Query", JSON.stringify(this.listArray));
    this.listItems(); //Kutsutaan listItems-funktiota
}

removeAll() {
  this.listArray = []; //Tyhjennetään array
  localStorage.setItem("New Query", JSON.stringify(this.listArray)); //set item local storagessa
  this.listItems(); //Kutsutaan listItems-funktiota
}
}
