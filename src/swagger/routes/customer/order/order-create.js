/**
 * @openapi
 * /customer/orders/create:
 *          post:
 *              summary: Customer Order Create
 *              operationId: customer-order-create
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               orderedItems:
 *                                  type: array
 *                                  items:
 *                                     type: string
 *                               totalPrice:
 *                                  type: number
 *                               shippingAddress:
 *                                  type: string
 *                            example:
 *                               orderedItems:
 *                                       - "6527e94fab99fe6977ed14c5"
 *                                       - "6527e94fab99fe6977ed14c5"
 *                                       - "6527e94fab99fe6977ed14c5"
 *                                       - "6527e94fab99fe6977ed14c5"
 *                               totalPrice: 50000
 *                               shippingAddress: Gwagwalada, Abuja, Nigeria
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
