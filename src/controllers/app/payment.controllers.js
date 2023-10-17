import PaymentService from "../../services/app/payment.service";

const handleWebhook = async (req, res, next) => {
     try {
          await PaymentService.handleWebhook(req);
          return res.status(200).json({
               status: true,
               data: null,
               message: "Request successful",
          });
     } catch (error) {
          next(error);
     }
};

export default {
     handleWebhook,
};
