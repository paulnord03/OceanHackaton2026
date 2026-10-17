// src/data/playerData.js
export const playerData = {
  name: "Caretta",
  gender: "female",
  origin: "var_cotedazur",
  
  setCustomization(name, gender, origin) {
    if (name) this.name = name;
    if (gender) this.gender = gender;
    if (origin) this.origin = origin;
  }
};