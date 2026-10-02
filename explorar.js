async function getPoke() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/shuckle");

  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return;
  }

  const datos = await respuesta.json();
  console.log("Nombre:", datos.name);
  console.log("Número en la pokedex:", datos.id);
  console.log("Altura:", datos.height);
  console.log("Peso:", datos.weight);
//   console.log("Tipos:", datos.types.map((tipo) => tipo.type.name).join(", "));
//   console.log("stats:", datos.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", "));  utilzando map para recorrer el array de stats y mostrar el nombre del stat y su valor base
//   console.log("Habilidades:", datos.abilities.map((habilidad) => habilidad.ability.name).join(", "));



console.log("Tipos:"); for (let i = 0; i < datos.types.length; i++) { console.log(datos.types[i].type.name); }
console.log("Stats:"); for (let i = 0; i < datos.stats.length; i++) { console.log( datos.stats[i].stat.name + ": " + datos.stats[i].base_stat ); }
console.log("Habilidades:"); for (let i = 0; i < datos.abilities.length; i++) { console.log(datos.abilities[i].ability.name); } }

getPoke();