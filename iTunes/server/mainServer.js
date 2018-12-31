var fs = require('fs');
const users = require('./users');

function login(user, res) {
  let newUser = JSON.stringify({password: user.password, email: user.email});
  console.log(newUser);
  let userSuccess= users.find((u)=> u.password==user.password && u.email===user.email);

  console.log('userSuccess',userSuccess);
  if(userSuccess){
    res.send({'status': 'approved'});
  }else{
    res.send({'status': ' not approved'});
  }

}
function registration(user, res) {
  let newUsers = users;
  newUsers.push(user);
  fs.writeFile('users.json', JSON.stringify(newUsers), 'utf8', (resJson)=>{
    console.log('resJson',resJson);
    res.send({'status': 'added'});});
}
function getUsers(res) {
  res.send({status:'approved',users});
}
function deleteUser(user,res) {
  console.log('user',user);
  let newUsers = users;
  var filtered = newUsers.filter((ele)=> ele.email!=user.email);
  console.log('filtered',filtered);
  fs.writeFile('users.json', JSON.stringify(filtered), 'utf8', (resJson)=>{
    console.log('resJson',resJson);
    res.send({'status': 'added'});});
}

const myFunc = {
  getUsers,
  login,
  registration,
  deleteUser
};


module.exports = myFunc;