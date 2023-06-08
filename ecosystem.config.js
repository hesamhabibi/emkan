module.exports = {
  apps: [{
    name: "panel",
    script: "cd panel && yarn start"
  },
  {
    name: "server",
    script: "cd server && yarn start"
  },
  {
    name: "web",
    script: "cd web && yarn start"
  },
  {
    name: "web_engine",
    script: "cd web_engine && yarn start"
  },
  ]
}
