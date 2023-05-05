const router = require("express").Router();
const fs = require("fs");
const roomdb = require("../rooms.json");
router.get("/allmeetingrooms", (req, res) => {
  res.status(200).send(roomdb.rooms);
});
router.get("/meetingroom/:id", (req, res) => {
  const data = roomdb.rooms.filter((e) => {
    return e.id == req.params.id;
  });
  res.status(200).send(data[0]);
});
router.delete("/meetingroom/:id", (req, res) => {
  const data = roomdb.rooms.filter((e) => {
    return e.id != req.params.id;
  });
  fs.writeFile("rooms.json", JSON.stringify({ rooms: data }), (err) => {
    if (err) {
      res.status(400).send({ err: err });
    } else {
      res.status(200).send("Success");
    }
  });
});
router.post("/meetingroom", (req, res) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    lastBooked: "",
    capacity: req.body.capacity,
    id: 0,
    meetings: [],
  };
  let highestindex = 0;
  const filtereddata = roomdb.rooms.filter((e, index) => {
    if (Number(e.id) > highestindex) {
      highestindex = Number(e.id);
    }
    return e.title === data.title;
  });
  console.log(filtereddata);
  if (filtereddata.length == 0) {
    data.id = highestindex + 1;
    roomdb.rooms.push(data);
    fs.writeFile("rooms.json", JSON.stringify(roomdb), (err) => {
      if (err) {
        res.status(400).send({ err: err });
      } else {
        res.status(200).send("Successfully added");
      }
    });
  } else {
    res.status(400).send("Duplicate name error");
  }
});
module.exports = router;
