import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [''],
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#8a2be2",
          "#ffc0cb",
          "#ac054d",
          "#33cc33",
          "#ff0000"
        ]
      }
    ],
    labels: ['']
  };

  private width: number;
  private height: number;
  private radius: number;

  private path: any;
  private inside: any;
  private pie: any;
  private color: any;
  private svg: any;


  constructor(private http: HttpClient, public dataService: DataService, private renderer: Renderer2, private chart: ElementRef) {
    this.width = 400;
    this.height = 400;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit(): void {
    for (var i = 0; i < this.dataService.budgetData.myBudget.length; i++) {
      this.dataSource.datasets[0].data[i] = this.dataService.budgetData.myBudget[i].budget;
      this.dataSource.labels[i] = this.dataService.budgetData.myBudget[i].title;
    }
    this.createChart();
    this.initSvg();
    this.drawPie();
  }

  createChart() {
    const canvas: any = this.chart.nativeElement.querySelector('#myChart');
    const ctx = canvas.getContext('2d');
    const myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: this.dataSource,
    });
  }

  private initSvg() {
    this.color = d3.scaleOrdinal([
      "#ffcd56",
      "#ff6384",
      "#36a2eb",
      "#fd6b19",
      "#8a2be2",
      "#ffc0cb",
      "#ac054d",
      "#33cc33",
      "#ff0000"
    ]);
    this.path = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(0);
    this.inside = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.budget);
    this.svg = d3.select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawPie() {
    let arc = this.svg.selectAll('.arc')
      .data(this.pie(this.dataService.budgetData.myBudget))
      .enter().append('g')
      .attr('class', 'arc');
    arc.append('path').attr('d', this.path)
      .style('fill', (d: any) => this.color(d.data.title));
    arc.append('text').attr('transform', (d: any) => 'translate(' + this.inside.centroid(d) + ')')
      .attr('dy', '.35em')
      .text((d: any) => d.data.title);
  }

}
