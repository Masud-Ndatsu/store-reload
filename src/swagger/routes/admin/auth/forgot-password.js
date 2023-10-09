/**
 * @openapi
 * /admin/auth/forget-password:
 *          post:
 *              summary: Admin Forgot Password
 *              operationId: admin-forgot-password
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
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
