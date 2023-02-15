const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const db = require("../../config/mongoose");
const Record = require("../record");
const User = require("../user");
const recordList = require("./seedsData/record.json").results;
const SEED_USER = {
  name: "鳴人",
  email: "root@example.com",
  password: "12345678",
};

db.once("open", () => {
  console.log("RecordSeeder is running!");
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      const userId = user._id;
      return Promise.all(
        Array.from(recordList, (_, i) =>
          Record.create({
            id: recordList[i].id,
            name: recordList[i].name,
            category: recordList[i].category,
            date: recordList[i].date,
            amount: recordList[i].amount,
            userId,
          })
        )
      ).then(() => {
        console.log("Closed!");
        return db.close();
      });
    });
});
