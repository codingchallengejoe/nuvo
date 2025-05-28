import axios from 'axios'
import { Payment, ProductsResponse } from '../Types/Product'

export class ProductHttpService {
  public static async getProducts(): Promise<ProductsResponse> {
    // const response = await axios.get<ProductsResponse>(
    //   'https://c8036bd8-ea01-4f47-9ff1-dbf8001a0500.mock.pstmn.io/products',
    //   {
    //     data: JSON.stringify({ requestId: '12344556' }),
    //   },
    // )

    return {
      requestId: '123',
      products: [
        {
          id: 123,
          name: 'Milk',
          price: 30,
          currency: 'USD',
          quantity: 0,
        },
        {
          id: 1234,
          name: 'Beer',
          price: 50,
          currency: 'USD',
          quantity: 0,
        },
        {
          id: 1235,
          name: 'Ice Cream',
          price: 10,
          currency: 'USD',
          quantity: 0,
        },
      ],
    }
  }

  public static async buyProducts(checkout: Payment): Promise<void> {
    // work here....
  }
}
