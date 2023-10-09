/**
 * @openapi
 * /customer/users/me:
 *          put:
 *              summary: Customer Profile
 *              operationId: customer-profile
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
 *                     description: Request successful
 *
 *
 */
