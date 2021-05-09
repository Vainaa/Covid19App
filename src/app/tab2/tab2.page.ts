import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public newConfirmed;
  public totalConfirmed;
  public newDeaths;
  public totalDeaths;
  public newRecovered;
  public totalRecovered;
  constructor() {}

  ngOnInit(){
    this.getCases();
  }


  async getCases() { // Haetaan rajapinnalta data 
    await fetch("https://api.covid19api.com/summary")
    .then(response => response.json())
    .then(data =>{
      this.newConfirmed=(data.Global.NewConfirmed);
      this.totalConfirmed=(data.Global.TotalConfirmed);
      this.newDeaths=(data.Global.NewDeaths);
      this.totalDeaths=(data.Global.TotalDeaths);
      this.newRecovered=(data.Global.NewRecovered);
      this.totalRecovered=(data.Global.TotalRecovered);
      
    })
    .catch(err => window.alert(err))
  }
  
}
