import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _orders$: BehaviorSubject<Order[]> = new BehaviorSubject<
    Order[]
  >([
    {
      customer: {
        name: 'Lev & Co',
        address: 'Khreshchatyk street 25, Kyiv, 12345',
        phone: '066-689-79-73',
        contactName: 'Lev',
      },
      _id: 'lskjsljasljsalf',
      product: {
        _id: 'sdfasdf',
        title: 'First',
        price: 1000,
        description:
          'First product lfjal alfjaf skjfsa fl;ksdajf safkljaf ;aslkfjsad',
        image:
          'https://sc1.musik-produktiv.com/pic-010153533xl/suhr-custom-modern-3ts.jpg',
        stock: 4,
        delivery: [
          { name: 'Standard', price: 50, checked: false },
          { name: 'Express', price: 70, checked: false },
          { name: 'Overnight', price: 100, checked: false },
        ],
      },
      quantity: 2,
      delivery: { name: 'Express', price: 70, checked: false },
      date: new Date(),
    },
    {
      customer: {
        name: 'Lev & Co',
        address: 'Khreshchatyk street 25, Kyiv, 12345',
        phone: '066-689-79-73',
        contactName: 'Lev',
      },
      _id: 'asdlja4ijwvd',
      product: {
        _id: 'sdfasdf',
        title: 'First',
        price: 1000,
        description:
          'First product lfjal alfjaf skjfsa fl;ksdajf safkljaf ;aslkfjsad',
        image:
          'https://sc1.musik-produktiv.com/pic-010153533xl/suhr-custom-modern-3ts.jpg',
        stock: 4,
        delivery: [
          { name: 'Standard', price: 50, checked: false },
          { name: 'Express', price: 70, checked: false },
          { name: 'Overnight', price: 100, checked: false },
        ],
      },
      quantity: 2,
      delivery: { name: 'Express', price: 70, checked: false },
      date: new Date(),
    },
    {
      customer: {
        name: 'Lev & Co',
        address: 'Khreshchatyk street 25, Kyiv, 12345',
        phone: '066-689-79-73',
        contactName: 'Lev',
      },
      _id: 'akdjsw4hvfjhssd5',
      product: {
        _id: 'sdfasdf',
        title: 'First',
        price: 1000,
        description:
          'First product lfjal alfjaf skjfsa fl;ksdajf safkljaf ;aslkfjsad',
        image:
          'https://sc1.musik-produktiv.com/pic-010153533xl/suhr-custom-modern-3ts.jpg',
        stock: 4,
        delivery: [
          { name: 'Standard', price: 50, checked: false },
          { name: 'Express', price: 70, checked: false },
          { name: 'Overnight', price: 100, checked: false },
        ],
      },
      quantity: 2,
      delivery: { name: 'Express', price: 70, checked: false },
      date: new Date(),
    },
  ]);
  public readonly orders$ = this._orders$.asObservable();
}
