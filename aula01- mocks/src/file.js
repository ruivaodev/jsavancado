const { readFile } = require("fs/promises");
const { join } = require("path");
const { constants } = require("./constants");

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    return content;
  }

  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath);
    return (await readFile(filename)).toString("utf8");
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");
    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
  }
}
(async () => {
  const result = await File.csvToJson("./../mocks/invalid-header.csv");
  console.log("result", result);
})();
