import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { TacheService } from 'src/app/service/tache.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

TacheService
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  yearControl = new FormControl('', Validators.required);
  monthControl = new FormControl('', Validators.required);
  dayControl = new FormControl('', Validators.required);
  
  
  //interfaceData
  lineData: any;
  pieData:any;
  //Data Label
  adherance : any;
  //values NGmodel
  adheranceValue: string ="AV";
  selectedyear: any ='' ;
  selectedmonth: any ='' ;
  selectedday: any ='';
  generatedate: any = {}  ;
  data:any;
  qtrealise : number =0;
  qtplanifie : number =0;
  qtatemps : number =0;
  qtratrrape : number =0;
  qtanticipe : number =0;
  codedata : any[]= [];
  display!:boolean;
  // data table
  realise :number= 0;
  anticipe:number = 0;
  retard:number = 0;
  planifie:number = 0;
  //date label
  years: any = [
    {name: '2022' },
    {name: '2021' },
    {name: '2020' },
    {name: '2019' },
    {name: '2018' },
  ];
  //month
  months : any = [];
  days : any = [];
  
  //date status
  role : string = this.token.getUser().roles[0];
  
  constructor(private products:TacheService,
    private token:TokenStorageService,
    private routing : AppRoutingModule,
     ) {
    //Data Label
    this.adherance = [
      { label: "Adherance Volume", value: "AV" },
      { label: "Adherance Mixte", value: "AX" },
    ];
    //day label
   }
   
  ngOnInit(): void 
  {    
    if(this.role != "ROLE_ADMIN"){
      this.routing.Redirect()
    }
    this.products.getByYear(new Date().getFullYear()).subscribe(res=>{
      this.data = res;
      this.ChangeAdherance(res)
    })
  }
  generateData()
  {
    if(this.selectedday?.name> 0)
    {
      this.products.getByDay(this.yearControl.value.name,this.monthControl.value.name,this.dayControl.value.name).subscribe(res=>{
        this.data = res;
        this.ChangeAdherance(res)
      })
    }
    else if(this.selectedmonth?.name?.length > 0 )
    {
      this.products.getByMonth(this.yearControl.value.name,this.monthControl.value.name,this.monthControl.value.code).subscribe(res=>{
        this.data = res;
        this.ChangeAdherance(res)
      })
    }
    else if(this.selectedyear?.name?.length > 0)
    {
      this.products.getByYear(this.selectedyear?.name).subscribe(res=>{
        this.data = res;
        this.ChangeAdherance(res)
      })
    }
  }
  generatedayByYear()
  {
    this.resetmonth();
    this.months = [
      { name: '1',code :31},
      { name: '2',code :28},
      { name: '3',code :31},
      { name: '4',code :30},
      { name: '5',code :31},
      { name: '6',code :30},
      { name: '7',code :31},
      { name: '8',code :31},
      { name: '9',code :30},
      { name: '10' ,code :31},
      { name: '11' ,code :30},
      { name: '12' ,code :31}
    ];
    if(this.selectedyear?.name % 4 == 0)
    {
      this.months[1].code = 29
    }
    else if(this.selectedyear?.name % 4 != 0)
    {
      this.months[1].code = 28
    }
  }
  generatedayByMonth()
  {
    this.resetday();
    for (var i = 1; i <= this.selectedmonth?.code; i++) {
        this.days.push({
            name: i
        });
    
    }
  }
  downloadPDF(){
    let doc = new jsPDF();
    autoTable(doc,{html:"#dashboard"});
    doc.save("dashboard");
  }
  resetday()
  {
    this.days = []
  }
  resetmonth()
  {
    this.months = []
    this.days = []
  }
ChangeAdherance(date:any)
  {
    if(this.adheranceValue == "AV")
    {
      let tabrealise = [];
      let tabretard = [];
      let tabanticipe = [];
      let tabproduct = [];
      this.realise = 0;
      this.retard = 0;
      this.anticipe = 0;
      for (let key in date) {
        if(date[key].realise == 1)
        {
          tabrealise.push(Number(date[key].produit))
          this.realise += Number(date[key].produit)
        }
        if(date[key].retard == 1)
        {
          tabretard.push(Number(date[key].produit))
          this.retard += Number(date[key].produit)
        }
        if(date[key].anticipe == 1)
        {
          tabanticipe.push(Number(date[key].produit))
          this.anticipe += Number(date[key].produit)
        }
        tabproduct.push(Number(key)+1);
        this.planifie += date[key].produit;
        
      }
      this.lineData = {
        labels: tabproduct,
        datasets: [
            {
                label: 'A temps',
                data: tabrealise,
                fill: true,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Rattrapé',
                data: tabretard,
                fill: true,
                borderColor: '#66BB6A',
                tension: .4
            },
            {
                label: 'Anticipé',
                data: tabanticipe,
                fill: true,
                borderColor: '#FFA726',
                tension: .4
            }
        ]
      };
      this.pieData = {
        labels: ['A temps','Rattrapé','Anticipé'],
        datasets: [
            {
              data: [this.realise, this.retard, this.anticipe],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
      };
      this.generateInfo()
    }

    if(this.adheranceValue == "AX")
    {
      let tabrealise = [];
      let tabproduct = [];
      this.realise = 0;
      this.planifie = 0
      for (let key in date) {
        if(this.data[key].realise == 1)
        {
          tabrealise.push(Number(date[key].produit))
          this.realise += Number(date[key].produit)
        }
        tabproduct.push(Number(key)+1);
        this.planifie += date[key].produit;
        
      }
      this.lineData = {
        labels: tabproduct,
        datasets: [
            {
                label: 'A temps',
                data: tabrealise,
                fill: true,
                borderColor: '#42A5F5',
                tension: .4
            }
        ]
      };
      this.pieData = {
      labels: ['Planifié','A temps'],
      datasets: [
          {
              data: [this.planifie,this.realise],
              backgroundColor: [
                  "#66BB6A",
                  "#42A5F5"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784"
              ]
          }
      ]
    };
    }
    this.generateInfo()
  }
generateInfo()
{
  this.qtrealise = 0
  this.qtplanifie = 0
  this.qtatemps = 0
  this.qtratrrape = 0
  this.qtanticipe = 0
  this.codedata = []
  for (let key in this.data) {
    this.qtplanifie += Number(this.data[key].produit) 
    
    if(this.data[key].realise == 1)
    {
      this.qtatemps += Number(this.data[key].produit)
      this.codedata.push([this.data[key].code_fab,this.data[key].produit,this.data[key].atelier,"realise"])
    }
    if(this.data[key].retard == 1)
    {
      this.qtratrrape += Number(this.data[key].produit)
      this.codedata.push([this.data[key].code_fab,this.data[key].produit,this.data[key].atelier,"retard"])
    }
    if(this.data[key].anticipe == 1)
    {
      this.qtanticipe += Number(this.data[key].produit)
      this.codedata.push([this.data[key].code_fab,this.data[key].produit,this.data[key].atelier,"anticipe"])
    }
  }
  
  this.qtrealise = this.qtatemps + this.qtratrrape + this.qtanticipe;
}

test()
{ 
}
  // getData()
  // {
  //   this.products.getProducts().subscribe((result)=>{
  //     console.log("running successfully",result)
  //     this.data = result
  //   },(error) =>{
  //     console.log("error is :",error)
  //   })
  // }
  
}
