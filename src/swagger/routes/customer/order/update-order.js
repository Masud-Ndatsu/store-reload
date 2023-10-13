/**
 * @openapi
 * /customer/orders/{orderId}:
 *          put:
 *              summary: Update Order by orderId
 *              operationId: update-order-id
 *              tags:
 *                 - Customer
 *              parameters:
 *                  - in: path
 *                    name: orderId
 *                    required: true
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
 *                     description: Request successful
 *
 *
 */
