import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  //dishes: Dish[] = DISHES;

  dishes: Dish[];
  errMess: string;

  

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

    


    ngOnInit() {
      this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);   
       }

  

}
