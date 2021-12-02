const fs = require("fs");
const path = require("path");

function importFile(location) {
  return fs.readFileSync(
    path.resolve(__dirname, location),
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
}

exports.importFile = importFile;
