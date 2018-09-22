const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  // Look up options for null

  db.users.push({
    id: '2',
    password: password,
    email: email,
    name: name,
    age: '',
    joined: new Date(),
    expences: [
      {
        timespan: 'All Time',
        tags: {
          Food: 0,
          Household: 0,
        }
      },
      {
        timespan: "This Month",
        tags: {
          Food: 0,
          Household: 0,
        }
      },
      {
        timespan: "This Week",
        tags: {
          Food: 0,
          Household: 0,
        }
      },
      {
        timespan: "Today",
        tags: {
          Food: 0,
          Household: 0,
        }
      }
    ],
    totalExpences: {
      AllTime: 0,
      thisMonth: 0,
      thisWeek: 0,
      today: 0
    },
    customUserTags: {
      // push to availableTags in componentDidMount
    }
  },);

  res.json(db.users[db.users.length -1]);
}

module.exports = {
  handleRegister
}
