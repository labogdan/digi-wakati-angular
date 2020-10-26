import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post(
      'https://api.cxur-kaocorpor1-s3-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token?client_id=clientcq&client_secret=password&grant_type=client_credentials',
      {}
    ).subscribe(responseData => {
      console.log(responseData)
    })
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
  private fetchPosts() {
    this.http
      .get('https://api.cxur-kaocorpor1-s3-public.model-t.cc.commerce.ondemand.com/kaowebservices/v2/wakati/products/2647500?categoryCode=conditioner')
      .pipe()
      .subscribe(responseData => {
        console.log(responseData);
      })
  }
}
