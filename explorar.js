  //----------Parte 1------------

// async function getPoke() {
//   const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/shuckle");

//   if (!respuesta.ok) {
//     console.log("Algo salió mal. Código:", respuesta.status);
//     return;
//   }
  
//   const datos = await respuesta.json();
//   console.log("Nombre:", datos.name);
//   console.log("Número en la pokedex:", datos.id);
//   console.log("Altura:", datos.height);
//   console.log("Peso:", datos.weight);
// //   console.log("Tipos:", datos.types.map((tipo) => tipo.type.name).join(", "));
// //   console.log("stats:", datos.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(", "));  utilzando map para recorrer el array de stats y mostrar el nombre del stat y su valor base
// //   console.log("Habilidades:", datos.abilities.map((habilidad) => habilidad.ability.name).join(", "));



// console.log("Tipos:"); for (let i = 0; i < datos.types.length; i++) { console.log(datos.types[i].type.name); }
// console.log("Stats:"); for (let i = 0; i < datos.stats.length; i++) { console.log( datos.stats[i].stat.name + ": " + datos.stats[i].base_stat ); }
// console.log("Habilidades:"); for (let i = 0; i < datos.abilities.length; i++) { console.log(datos.abilities[i].ability.name); } }

// getPoke();

// -----------Parte 2------------

async function buscarPokemon(nombre) {
const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/"+ nombre.toLowerCase());  

if (!respuesta.ok) {
	console.log("Algo salió mal. Código:", respuesta.status);
	     return null;
	   }

// const datos = await respuesta.json();
// console.log("Nombre:", datos.name);
// console.log("Número en la pokedex:", datos.id);
// console.log("Altura:", datos.height);
// console.log("Peso:", datos.weight);

	   return await respuesta.json();
}

// buscarPokemon("misingno");
// buscarPokemon("shuckle");
// buscarPokemon("PIKACHU");
// buscarPokemon("charizard");


//-----------Parte 3------------

async function mostrarPokemon(pokemon) {
    const datos = await buscarPokemon(pokemon);
    if (!datos) {
        console.log("Pokemon no encontrado");
        return;
    }

    console.log("Nombre:", datos.name.toUpperCase());
    console.log("Número en la pokedex:", datos.id);

    // 1. Conversión de altura (cm) y peso (kg)
    console.log("Altura:", datos.height * 10 + " cm");
    console.log("Peso:", datos.weight / 10 + " kg");

    // Tipos separados por /
    const listaTipos = datos.types.map(t => t.type.name).join("/");
    console.log("Tipos: " + listaTipos);

    // 2. Recorrer y mostrar todas las stats
    console.log("Stats:");
    for (let i = 0; i < datos.stats.length; i++) {
        console.log(`- ${datos.stats[i].stat.name}: ${datos.stats[i].base_stat}`);
    }

    // 3. Recorrer habilidades e indicar si es oculta
    console.log("Habilidades:");
    for (let i = 0; i < datos.abilities.length; i++) {
        const hab = datos.abilities[i];
        const esOculta = hab.is_hidden ? " (oculta)" : "";
        console.log(`- ${hab.ability.name}${esOculta}`);
    }
}

// 4.1 — Función auxiliar
function obtenerStat(datos, nombreStat) {
    for (let i = 0; i < datos.stats.length; i++) {
        if (datos.stats[i].stat.name === nombreStat) {
            return datos.stats[i].base_stat;
        }
    }
    return null;
}


// -------------Parte 4------------

async function compararPokemon(nombre1, nombre2, stat) {
    // 1. Buscar ambos pokémon
    const p1 = await buscarPokemon(nombre1);
    const p2 = await buscarPokemon(nombre2);

    // 2. Si alguno vino null, avisar y salir
    if (!p1 || !p2) {
        console.log("No se pudo realizar la comparación porque uno o ambos Pokémon no fueron encontrados.");
        return;
    }

    // 3. Obtener el valor de la stat para cada uno
    const valor1 = obtenerStat(p1, stat);
    const valor2 = obtenerStat(p2, stat);

    // 4. Si la stat no existe en alguno (viene null), avisar cuáles son las válidas y salir
    if (valor1 === null || valor2 === null) {
        console.log(`La stat "${stat}" no existe. Las stats válidas son: hp, attack, defense, special-attack, special-defense, speed.`);
        return;
    }

    // 5. Comparar valores e imprimir el resultado
    console.log(`Comparando ${p1.name.toUpperCase()} vs ${p2.name.toUpperCase()} en ${stat}:`);
    console.log(`${p1.name.toUpperCase()}: ${valor1}`);
    console.log(`${p2.name.toUpperCase()}: ${valor2}`);

    if (valor1 > valor2) {
        console.log(`Gana ${p1.name.toUpperCase()}`);
    } else if (valor2 > valor1) {
        console.log(`Gana ${p2.name.toUpperCase()}`);
    } else {
        console.log("¡Es un empate!");
    }
}

//------parte 5-------


async function pokemonMasFuerte(listaNombres, stat) {

    let mejorNombre = null;
    let mejorValor = -1;


    for (let i = 0; i < listaNombres.length; i++) {
        const nombre = listaNombres[i];
        
        const datos = await buscarPokemon(nombre);

        if (!datos) {
            continue;
        }

        // Obtener el valor de la stat requerida
        const valorStat = obtenerStat(datos, stat);

        // Si la stat no existe (null), saltarlo también
        if (valorStat === null) {
            continue;
        }

        // Si el valor es mayor al mejor guardado, actualizar variables
        if (valorStat > mejorValor) {
            mejorValor = valorStat;
            mejorNombre = datos.name;
        }
    }

    if (mejorNombre) {
        console.log(`El pokémon más fuerte en "${stat}" es ${mejorNombre.toUpperCase()} con un valor de ${mejorValor}.`);
    } else {
        console.log(`No se encontraron resultados válidos para la stat "${stat}".`);
    }

    return mejorNombre;
}


async function probarTaller() {
    console.log("========================================");
    console.log("PRUEBA PARTE 3: mostrarPokemon");
    console.log("========================================");
    await mostrarPokemon("pikachu");

    console.log("\n========================================");
    console.log("PRUEBA PARTE 4: compararPokemon");
    console.log("========================================");
    // 1. Snorlax vs Machamp (Ejercicio 4.1)
    await compararPokemon("snorlax", "machamp", "attack");
    
    console.log("\n--- Prueba 2: Comparación en defense ---");
    await compararPokemon("blastoise", "charizard", "defense");

    console.log("\n--- Prueba 3: Stat inexistente ---");
    await compararPokemon("pikachu", "eevee", "fuerza");

    console.log("\n========================================");
    console.log("PRUEBA PARTE 5: Desafío Final");
    console.log("========================================");
    const miEquipo = ["pikachu", "charizard", "blastoise", "snorlax", "mewtwo", "gengar"];

    console.log("\n--- Más fuerte en Attack ---");
    const ganadorAttack = await pokemonMasFuerte(miEquipo, "attack");

    console.log("\n--- Más fuerte en Defense ---");
    await pokemonMasFuerte(miEquipo, "defense");

    console.log("\n--- Ficha del Pokémon más fuerte en Attack ---");
    if (ganadorAttack) {
        await mostrarPokemon(ganadorAttack);
    }
}


probarTaller();