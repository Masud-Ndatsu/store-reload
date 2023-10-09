/**
 * @openapi
 * /customer/auth/login:
 *          post:
 *              summary: Customer Login
 *              operationId: customer-login
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               shopName:
 *                                  type: string
 *                               password:
 *                                  type: string
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
