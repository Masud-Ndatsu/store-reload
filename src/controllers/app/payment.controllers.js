const handleWebhook = async (req, res, next) => {
     try {
          // If you specified a secret hash, check for the signature
          const secretHash = process.env.FLW_SECRET_HASH;
          const signature = req.headers["verif-hash"];
          if (!signature || signature !== secretHash) {
               return res.status(400).end();
          }
          const payload = req.body;

          console.log(payload);
          return res.status(200).end();
     } catch (error) {
          next(error);
     }
};

export { handleWebhook };
