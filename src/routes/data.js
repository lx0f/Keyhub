
const dataRouter = require("express").Router()
const dfd = require('danfojs-node')
const User = require("../models/user")

dataRouter.get('/chart-info', async (req, res) => {
    const usersJoined = await User.findAll();
    const users = usersJoined.map((x) => x.dataValues);
  
    let data = [];
    let cols = ["Dates","NoOfUsersJoined"];
  
  
    usersJoined.forEach(element => {
      let rawData = [element.date, 1];

      data.push(rawData)
    
      
    });
    data.push(["08/01/2022", 1])
    data.push(["08/01/2022", 1])
    data.push(["09/01/2022", 1])
    data.push(["10/01/2022", 5])
    const df = new dfd.DataFrame(data,{columns:["Dates","NoOfUsersJoined"]})
    const group_df = df.groupby(["Dates"]).sum()
    console.log(group_df)
    const df2 = dfd.toJSON(group_df,{format:"json"})
    res.status(200).json({ 'data':df2 })
  });



  dataRouter.get('/chart-info', async (req, res) => {
    const usersJoined = await User.findAll();
    const users = usersJoined.map((x) => x.dataValues);
  
    let data = [];
    let cols = ["Dates","NoOfUsersJoined"];
  
  
    usersJoined.forEach(element => {
      let rawData = [element.date, 1];

      data.push(rawData)
    
      
    });
    data.push(["08/01/2022", 1])
    data.push(["08/01/2022", 1])
    data.push(["09/01/2022", 1])
    data.push(["10/01/2022", 5])
    const df = new dfd.DataFrame(data,{columns:["Dates","NoOfUsersJoined"]})
    const group_df = df.groupby(["Dates"]).sum()
    console.log(group_df)
    const df2 = dfd.toJSON(group_df,{format:"json"})
    res.status(200).json({ 'data':df2 })
  });


  
  

  dataRouter.get('/chart-info-year', async (req, res) => {
    const usersJoined = await User.findAll();
    const users = usersJoined.map((x) => x.dataValues);
  
    let data = [];
    let cols = ["Dates","NoOfUsersJoined"];
  
  
    usersJoined.forEach(element => {
      let rawData = [element.date[2].split("/")[1], 1];

      data.push(rawData)
    
      
    });
    data.push(["2022", 1])
    data.push(["2022", 1])
    data.push(["2022", 1])
    data.push(["2022", 5])
    const df = new dfd.DataFrame(data,{columns:["Dates","NoOfUsersJoined"]})
    const group_df = df.groupby(["Dates"]).sum()
    console.log(group_df)
    const df2 = dfd.toJSON(group_df,{format:"json"})
    res.status(200).json({ 'data':df2 })
  });











  dataRouter.get('/chart-info-month', async (req, res) => {
    const usersJoined = await User.findAll();
    const users = usersJoined.map((x) => x.dataValues);
  
    let data = [];
    let cols = ["Dates","NoOfUsersJoined"];
    data.push(["01/2022", 1])
    data.push(["01/2022", 1])
    data.push(["01/2022", 1])
    data.push(["01/2022", 5])
  
    usersJoined.forEach(element => {
      let rawData = [element.date.split("/")[1] + "/" + element.date.split("/")[2], 1];


      data.push(rawData)
    
      
    });

    const df = new dfd.DataFrame(data,{columns:["Dates","NoOfUsersJoined"]})
    const group_df = df.groupby(["Dates"]).sum()
    console.log(group_df)
    const df2 = dfd.toJSON(group_df,{format:"json"})
    res.status(200).json({ 'data':df2 })
  });













  module.exports = dataRouter;