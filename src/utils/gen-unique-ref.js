export default async () => {
     let letters = "abcdefghijklmnopqrstuvwxyz";
     let timeStamp = Date.now();
     let lastFour = String(timeStamp).substr(7, 13);
     let uniqref = "";
     let refchar = "";
     let refcharcodes = "";
     for (let i = 0; i < String(lastFour).length; i++) {
          const tpos = String(lastFour)[i];
          let uniqueNum = Math.ceil(
               letters[tpos].charCodeAt() /
                    Math.ceil(
                         Math.random() *
                              Number(String(timeStamp).substr(11, 13))
                    )
          );
          if (uniqueNum % 2 == 0) {
               refchar = refchar + String(letters[tpos]).toUpperCase();
               refchar = String(refchar).concat(uniqueNum);
          } else {
               refchar = refchar + String(letters[tpos]);
               refchar = String(refchar).concat(uniqueNum);
          }
          refcharcodes = String(refcharcodes).concat(uniqueNum);
     }
     uniqref = refchar;
     return uniqref;
};
