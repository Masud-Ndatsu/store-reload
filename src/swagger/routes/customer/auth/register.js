/**
 * @openapi
 * /customer/auth/register:
 *          post:
 *              summary: Customer Register
 *              operationId: customer-register
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
 *                               address:
 *                                  type: string
 *                               LGA:
 *                                  type: string
 *                            example:
 *                               shop_name: Amuse Finance
 *                               password: financial
 *                               address: New Line Mall
 *                               LGA: New York, California
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
