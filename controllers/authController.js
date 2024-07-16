const jwt = require("jsonwebtoken");
const crypt = require("node:crypto");
const users = require("../models/userModel");
const config = require("../config/config");
const db = require("../databases/db");

exports.register = (req, res) => {
  const { username, lastname, del_address, tel, rol, password } = req.body;

  const hash = crypt.Hash("sha256", 8);
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  
  
  const valor = [
    username,
    lastname,
    del_address,
    tel,
    rol,
    hashedPassword
  ];
  
  
  sql =
  "INSERT INTO Usuarios (nombre, apellido, dir_entrega, telefono, rol, clave) VALUES (?, ?, ?, ?, ?, ?)";
db.query(sql, valor, (err, resultado) => {
  //Consulta SQL para presentación en Front End.
  if (err) throw err;
  //res.send("Registro correctamente agregado");
});


  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  const token = jwt.sign({ id: newUser.id }, config.secretKey, {
    expiresIn: config.tokenExpiresIn,
  });
  res.status(201).send({ auth: true, token });
  console.log(users);
};

exports.login = (req, res)=>{
    const {username, password} = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).send ('User not found');
    
    const hash = crypt.Hash("sha256", 8);
    hash.update(password);
    const verHash = hash.digest("hex");
    const passwordIsValid = verHash === user.password;
    if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

    const token = jwt.sign({id: user.id}, config.secretKey, {expiresIn: config.tokenExpiresIn});
    res.status(200).send({ auth:true, token});
};
