const { Readable } = require("stream");

const webStreamToNodeStream = (webStream) => {
  const reader = webStream?.getReader();

  return new Readable({
    async read() {
      try {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null); // signal end of stream
        } else {
          this.push(Buffer.from(value));
        }
      } catch (err) {
        this.destroy(err);
      }
    },
  });
};

module.exports = webStreamToNodeStream;
