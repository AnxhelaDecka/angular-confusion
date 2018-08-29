import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() {
   
   }
   getDishes(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getDish(id: number): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  }

}
