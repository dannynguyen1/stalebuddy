function UserModel(name, email, phone, password) {
  return {
    "name" : name,
    "email": email,
    "phone": phone,
    "password" : password,
    "grocery_list" : null,
    "recipes":null
  };
}

module.exports = {
  name: "stalebuddyUser",
  constructor: UserModel
}