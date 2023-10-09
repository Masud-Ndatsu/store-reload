/**
 * @openapi
 * /customer/auth/reset-password:
 *          post:
 *              summary: Customer Forgot Password
 *              operationId: customer-forgot-password
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               email:
 *                                  type: string
 *                                  format: email
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
