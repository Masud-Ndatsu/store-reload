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
 *                               shop_name:
 *                                  type: string
 *                               password:
 *                                  type: string
 *                            example:
 *                               shop_name: Amuse Finance
 *                               password: financial
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
