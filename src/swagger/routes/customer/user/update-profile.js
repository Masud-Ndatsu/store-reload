/**
 * @openapi
 * /customer/users/me:
 *          put:
 *              summary: Customer Profile Update
 *              operationId: customer-profile-update
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
 *                               phoneNumber:
 *                                  type: string
 *                               NIN:
 *                                  type: string
 *                               firstName:
 *                                  type: string
 *                               lastName:
 *                                  type: string
 *                               gender:
 *                                  type: string
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
