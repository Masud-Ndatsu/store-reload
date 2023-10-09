/**
 * @openapi
 * /admin/auth/register:
 *          post:
 *              summary: Admin Register
 *              operationId: admin-register
 *              tags:
 *                 - Admin
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
 *                               password:
 *                                  type: string
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
