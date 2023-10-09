/**
 * @openapi
 * /admin/auth/password-change:
 *          post:
 *              summary: Admin Change Password
 *              operationId: admin-change-password
 *              tags:
 *                 - Admin
 *              requestBody:
 *                   required: true
 *                   content:
 *                      application/json:
 *                          schema:
 *                            type: object
 *                            properties:
 *                               password:
 *                                  type: string
 *                               userId:
 *                                  type: string
 *                               token:
 *                                  type: string
 *              responses:
 *                  "200":
 *                      description: Resquest Successful
 *
 *
 */
