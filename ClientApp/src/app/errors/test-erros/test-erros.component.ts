import { NgIfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-erros',
  templateUrl: './test-erros.component.html',
  styleUrls: ['./test-erros.component.css']
})
export class TestErrosComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: resp => { console.log(resp) },
      error: error => { console.log(error) }
    });
  }
  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: resp => { console.log(resp) },
      error: error => { console.log(error) }
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: resp => { console.log(resp) },
      error: error => { console.log(error) }
    });
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: resp => { console.log(resp) },
      error: error => { console.log(error) }
    });
  }
  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: resp => { console.log(resp) },
      error: error => {
        console.log(error)
        this.validationErrors = error;
      }
    });
  }
  get201Accepted(){
    this.http.get(this.baseUrl + 'buggy/Accepted').subscribe({
      next: resp => { console.log(resp) },
      error: error => { console.log(error) }
    });

  }

}
