/**
 * @openapi
 * /admin/auth/login:
 *          post:
 *              summary: Admin Login
 *              operationId: admin-login
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
