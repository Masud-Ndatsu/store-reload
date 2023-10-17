/**
 * @openapi
 * /customer/orders/cart:
 *          post:
 *              summary: Customer Add to Cart
 *              operationId: customer-cart-add
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               product_id:
 *                                  type: string
 *                               quantity:
 *                                  type: number
 *                            example:
 *                               product_id: 6527e94fab99fe6977ed14c5
 *                               quantity: 5
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
