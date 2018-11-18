const eventsource = require("eventsource");
const request = require("request");
const fs = require("fs");
const path = require("path");
const isImage = require("is-image");
const imageSize = require("image-size");

class SoroushBot {
  constructor(token, SSE = true) {
    this.url = `https://bot.sapp.ir/${token}`;
    if (SSE) this.startSSE();
  }

  startSSE() {
    const eventSource = new eventsource(`${this.url}/getMessage`, {
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json"
      }
    });
    eventSource.onerror = error => {
      this.onMessageError(error);
    };
    eventSource.onmessage = event => {
      this.onMessage(JSON.parse(event.data));
    };
  }

  callApi(json) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: `${this.url}/sendMessage`,
          method: "POST",
          json
        },
        (err, res, body) => {
          if (err) return reject(err);
          if (body.resultCode !== 200) return reject(body);

          return resolve(body);
        }
      );
    });
  }

  /**
   * @param {String} filePath file path on your system
   */
  uploadFile(filePath) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: `${this.url}/uploadFile`,
          method: "POST",
          formData: { file: fs.createReadStream(filePath) },
          json: true
        },
        (err, res, body) => {
          if (err) return reject(err);
          if (body.resultCode !== 200) return reject(body);

          let result = { fileUrl: body.fileUrl };

          result.fileName = path.basename(filePath);
          result.fileSize = fs.statSync(filePath).size;

          if (isImage(filePath)) {
            const dimensions = imageSize(filePath);
            result.imageWidth = dimensions.width;
            result.imageHeight = dimensions.height;
          }

          return resolve(result);
        }
      );
    });
  }

  /**
   * @param {String} fileUrl soroush file hash url
   * @param {String} fileSavePath
   */
  downloadFile(fileUrl, fileSavePath = null) {
    return new Promise((resolve, reject) => {
      const req = request(
        {
          url: `${this.url}/downloadFile/${fileUrl}`,
          method: "GET",
          json: true
        },
        (err, res, body) => {
          if (err) return reject(err);
          if (res.statusCode !== 200)
            return reject({
              resultCode: res.statusCode,
              resultMessage: "Invalid File Url"
            });

          if (!fileSavePath) return resolve(body);
        }
      ).on("response", res => {
        if (res.statusCode === 200 && fileSavePath) {
          req.pipe(
            fs.createWriteStream(fileSavePath).on("finish", () => {
              return resolve({ resultCode: 200, resultMessage: "File Saved" });
            })
          );
        }
      });
    });
  }

  /**
   * @param {String} to
   * @param {String} text 
   * @param {Array} keyboard 
   */
  sendText(to, text, keyboard = null) {
    return new Promise((resolve, reject) => {
      let json = {
        type: "TEXT",
        to,
        body: text
      };
      if (keyboard) json.keyboard = keyboard;
      this.callApi(json).then(resolve, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} fileType IMAGE, VIDEO, GIF, PUSH_TO_TALK, ATTACHMENT
   * @param {String} fileUrl soroush file hash url
   * @param {Object} options {caption, fileName, fileSize, keyboard}
   */
  sendFileWithType(to, fileType, fileUrl, options = {}) {
    return new Promise((resolve, reject) => {
      const json = {
        ...options,
        type: "FILE",
        fileType,
        to,
        fileUrl
      };
      this.callApi(json).then(resolve, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} filePath file path on your system
   * @param {Object} options {caption, fileName, fileSize, keyboard}
   */
  sendFile(to, filePath, options = {}) {
    return new Promise((resolve, reject) => {
      this.uploadFile(filePath).then(uploaded => {
        options.fileName = options.fileName || uploaded.fileName;
        options.fileSize = options.fileSize || uploaded.fileSize;

        this.sendFileUploaded(
          to,
          uploaded.fileUrl,
          options.fileName,
          options.fileSize,
          options
        ).then(resolve, reject);
      }, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} fileUrl soroush file hash url
   * @param {String} fileName file name
   * @param {Int} fileSize file size
   * @param {Object} options {caption, fileName, fileSize, keyboard}
   */
  sendFileUploaded(to, fileUrl, fileName, fileSize, options = {}) {
    return new Promise((resolve, reject) => {
      options = { ...options, fileName, fileSize, body: options.caption };
      delete options.caption;
      this.sendFileWithType(to, "ATTACHMENT", fileUrl, options).then(
        resolve,
        reject
      );
    });
  }

  /**
   * @param {String} to
   * @param {String} filePath file path on your system
   * @param {Object} options {caption, fileName, thumbnailUrl, imageWidth, imageHeight, fileSize, keyboard}
   */
  sendImage(to, filePath, options = {}) {
    return new Promise((resolve, reject) => {
      this.uploadFile(filePath).then(uploaded => {
        options.imageWidth = options.imageWidth || uploaded.imageWidth;
        options.imageHeight = options.imageHeight || uploaded.imageHeight;
        options.fileName = options.fileName || uploaded.fileName;
        options.fileSize = options.fileSize || uploaded.fileSize;

        this.sendImageUploaded(
          to,
          uploaded.fileUrl,
          options.imageWidth,
          options.imageHeight,
          options
        ).then(resolve, reject);
      }, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} fileUrl soroush file hash url
   * @param {Int} imageWidth 
   * @param {Int} imageHeight 
   * @param {Object} options {caption, fileName, thumbnailUrl, fileSize, keyboard}
   */
  sendImageUploaded(to, fileUrl, imageWidth, imageHeight, options = {}) {
    return new Promise((resolve, reject) => {
      options = { ...options, imageWidth, imageHeight, body: options.caption };
      delete options.caption;
      this.sendFileWithType(to, "IMAGE", fileUrl, options).then(
        resolve,
        reject
      );
    });
  }

  /**
   * @param {String} to
   * @param {String} filePath file path on your system
   * @param {Object} options {caption, fileName, thumbnailUrl, imageWidth, imageHeight, fileSize, keyboard}
   */
  sendGif(to, filePath, options = {}) {
    return new Promise((resolve, reject) => {
      this.uploadFile(filePath).then(uploaded => {
        options.imageWidth = options.imageWidth || uploaded.imageWidth;
        options.imageHeight = options.imageHeight || uploaded.imageHeight;
        options.fileName = options.fileName || uploaded.fileName;
        options.fileSize = options.fileSize || uploaded.fileSize;

        this.sendGifUploaded(
          to,
          uploaded.fileUrl,
          options.imageWidth,
          options.imageHeight,
          options
        ).then(resolve, reject);
      }, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} fileUrl soroush file hash url
   * @param {Int} imageWidth 
   * @param {Int} imageHeight 
   * @param {Object} options {caption, fileName, thumbnailUrl, fileSize, keyboard}
   */
  sendGifUploaded(to, fileUrl, imageWidth, imageHeight, options = {}) {
    return new Promise((resolve, reject) => {
      options = { ...options, imageWidth, imageHeight, body: options.caption };
      delete options.caption;
      this.sendFileWithType(to, "GIF", fileUrl, options).then(resolve, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} videoPath video path on your system
   * @param {String} thumbnailPath thumbnail image path on your system
   * @param {Int} fileDuration 
   * @param {Object} options {caption, fileName, thumbnailWidth, thumbnailHeight, fileSize, keyboard}
   */
  sendVideo(to, videoPath, thumbnailPath, fileDuration, options = {}) {
    return new Promise((resolve, reject) => {
      this.uploadFile(videoPath).then(videoUploaded => {
        options.fileName = options.fileName || videoUploaded.fileName;
        options.fileSize = options.fileSize || videoUploaded.fileSize;

        this.uploadFile(thumbnailPath).then(thumbUploaded => {
          options.thumbnailWidth =
            options.thumbnailWidth || thumbUploaded.imageWidth;
          options.thumbnailHeight =
            options.thumbnailHeight || thumbUploaded.imageHeight;

          this.sendVideoUploaded(
            to,
            videoUploaded.fileUrl,
            fileDuration,
            thumbUploaded.fileUrl,
            options.thumbnailWidth,
            options.thumbnailHeight,
            options
          ).then(resolve, reject);
        });
      }, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} fileUrl soroush file hash url
   * @param {Int} fileDuration 
   * @param {String} thumbnailUrl soroush file hash url
   * @param {Int} thumbnailWidth 
   * @param {Int} thumbnailHeight 
   * @param {Object} options {caption, fileName, fileSize, keyboard}
   */
  sendVideoUploaded(
    to,
    fileUrl,
    fileDuration,
    thumbnailUrl,
    thumbnailWidth,
    thumbnailHeight,
    options = {}
  ) {
    return new Promise((resolve, reject) => {
      options = {
        ...options,
        fileDuration,
        thumbnailUrl,
        thumbnailWidth,
        thumbnailHeight,
        body: options.caption
      };
      delete options.caption;
      this.sendFileWithType(to, "VIDEO", fileUrl, options).then(
        resolve,
        reject
      );
    });
  }

  /**
   * @param {String} to
   * @param {String} filePath file path on your system
   * @param {Int} fileDuration 
   * @param {Object} options {caption, fileName, fileSize, keyboard}
   */
  sendVoice(to, filePath, fileDuration, options = {}) {
    return new Promise((resolve, reject) => {
      this.uploadFile(filePath).then(uploaded => {
        options.fileName = options.fileName || uploaded.fileName;
        options.fileSize = options.fileSize || uploaded.fileSize;

        this.sendVoiceUploaded(
          to,
          uploaded.fileUrl,
          fileDuration,
          options
        ).then(resolve, reject);
      }, reject);
    });
  }

  /**
   * @param {String} to
   * @param {String} filePath file path on your system
   * @param {Object} options {caption, fileName, fileSize, keyboard}
   */
  sendVoiceUploaded(to, fileUrl, fileDuration, options = {}) {
    return new Promise((resolve, reject) => {
      options = { ...options, fileDuration, body: options.caption };
      delete options.caption;
      this.sendFileWithType(to, "PUSH_TO_TALK", fileUrl, options).then(
        resolve,
        reject
      );
    });
  }

  /**
   * @param {String} to
   * @param {Double} latitude 
   * @param {Double} longitude 
   */
  sendLocation(to, latitude, longitude, keyboard = null) {
    return new Promise((resolve, reject) => {
      let json = {
        type: "LOCATION",
        to,
        latitude,
        longitude
      };
      if (keyboard) json.keyboard = keyboard;
      this.callApi(json).then(resolve, reject);
    });
  }

  /**
   * @param {String} to
   * @param {Array} keyboard 
   */
  changeKeyboard(to, keyboard) {
    return new Promise((resolve, reject) => {
      const json = {
        type: "CHANGE",
        to,
        keyboard
      };
      this.callApi(json).then(resolve, reject);
    });
  }
}

module.exports = SoroushBot;
