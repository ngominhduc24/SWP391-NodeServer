let getData = async (req, res) => {
  const data = [
    {
      name: "Nguyen Van A",
      age: 20,
    },
    {
      name: "Nguyen Van B",
      age: 21,
    },
    {
      name: "Nguyen Van C",
      age: 22,
    },
  ];
  return res.status(200).json(data);
};


module.exports = {
  getData,
};