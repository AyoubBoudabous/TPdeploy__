import { Component, inject, OnInit } from '@angular/core';
import { EmployeService } from '../../services/employe-service';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [JsonPipe],
  selector: 'app-employe-list',
  styleUrl: './employe-list.css',
  templateUrl: './employe-list.html',
})
export class EmployeList implements OnInit{
  private readonly employeService= inject(EmployeService);
  employes= this.employeService.employes; 
  ngOnInit(): void {
      this.employeService.getEmployes().subscribe()
  }
}
