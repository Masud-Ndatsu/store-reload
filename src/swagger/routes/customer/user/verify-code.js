/**
 * @openapi
 * /customer/users/verify-code:
 *          post:
 *              summary: Customer Email Verification
 *              operationId: customer-email-verification
 *              tags:
 *                 - Customer
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               code:
 *                                  type: string
 *              responses:
 *                  "200":
 *                      description: Request successful
 *
 *
 */
