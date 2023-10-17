/**
 * @openapi
 * /customer/users/setup:
 *          post:
 *              summary: Customer Account Setup
 *              operationId: customer-account-setup
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
 *                               phone_number:
 *                                  type: string
 *                               NIN:
 *                                  type: string
 *                               first_name:
 *                                  type: string
 *                               last_name:
 *                                  type: string
 *                               gender:
 *                                  type: string
 *                            example:
 *                               email: masudndatsu@gmail.com
 *                               phone_number: "08167133592"
 *                               NIN: "28167133592"
 *                               first_name: Masud
 *                               last_name: Ndatsu
 *                               gender: Male
 *              responses:
 *                  "200":
 *                     description: Request successful
 *
 *
 */
