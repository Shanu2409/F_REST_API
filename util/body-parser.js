module.exports = async (reqest) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      reqest.on("data", (chunk) => {
        body += chunk;
      });
      reqest.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
