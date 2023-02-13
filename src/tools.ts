import Entity from "./classes/entity";
import colors from "./colors";
import * as playersJson from "../resources/players.json";
import * as enemiesJson from "../resources/enemies.json";
import * as bossesJson from "../resources/bosses.json";
import Player from "./classes/player";
import Enemy from "./classes/enemy";
import Boss from "./classes/boss";

const readlineSync = require("readline-sync");

// function to generate enemies randomly
export function getRandomChoice() {
  return (Math.floor(Math.random() * 2) + 1).toString();
}

// function managing the home interface
export function welcomeMessage() {
  console.log("Welcome to this wonderful world of Hyrule Castle.");
  console.log("You are going to live an extraordinary adventure.");
  console.log("Your role will be to save the kingdom of Hyrule.");
  console.log();
  console.log("To accomplish your mission, you will have to be strong...");
  console.log("You would fight against monsters and reach the final boss.");
  console.log(
    "After that, you will become the true hero of the kingdom of Hyrule."
  );
  console.log();
  console.log("Are you ready for that ?");
  console.log();
}

// function handling player actions and game command violations/errors
export function getPlayerChoice() {
  const choices: string[] = ["1", "2"];

  let playerChoice: string = readlineSync.question("\nWhat to do Hero ?! ");

  if (choices.includes(playerChoice)) {
    return playerChoice;
  }

  console.log();
  console.log("🤨 Don't try to bend the rules!");
  console.log("😠 This is your last chance, don't make me choose! 😠");

  playerChoice = readlineSync.question("Make the right choice!\n");

  if (choices.includes(playerChoice)) {
    return playerChoice;
  }

  console.log("🤬 You have been warned enough! 🖕");
  playerChoice = getRandomChoice();

  return playerChoice;
}

// function to color life bars according to life
export function colorHealthBar(entity: Entity) {
  const maxHp: number = entity.maxHp / 3;
  if (entity.hp >= maxHp * 2) {
    return colors.fg.green;
  }

  if (entity.hp >= maxHp) {
    return colors.fg.yellow;
  }

  return colors.fg.red;
}

// function to display the combat interface
export function displayFightInterface(
  player: Entity,
  enemy: Entity,
  n: number
) {
  const playerHealthBarColor: string = `${colorHealthBar(
    player
  )}${player.getHealthBar()}${colors.reset}`;
  const enemyHealthBarColor: string = `${colorHealthBar(
    enemy
  )}${enemy.getHealthBar()}${colors.reset}`;

  console.log(`========== Fight ${n} ==========`);

  console.log(`${colors.fg.red}${enemy.name}${colors.reset}`);
  console.log(`HP: ${enemyHealthBarColor} ${enemy.hp} / ${enemy.maxHp}`);

  console.log();

  console.log(`${colors.fg.green}${player.name}${colors.reset}`);
  console.log(`HP: ${playerHealthBarColor} ${player.hp} / ${player.maxHp}`);

  console.log();

  console.log(`${colors.fg.blue}========== Options ===========${colors.reset}`);
  console.log(`${colors.fg.cyan}1. Attack  🗡️  |   2. Heal ✨${colors.reset}`);

  console.log();
}

// Retrieve the characteristics of the Json files
export function getPlayersFromJson() {
  const players: Player[] = [];
  playersJson.players.forEach((player: any) => {
    players.push(
      new Player(
        player.id,
        player.name,
        player.hp,
        player.mp,
        player.str,
        player.int,
        player.def,
        player.res,
        player.spd,
        player.luck,
        player.race,
        player.class,
        player.rarity
      )
    );
  });
  return players;
}

// Get enemy characteristics from Json files
export function getEnemiesFromJson() {
  const enemies: Enemy[] = [];
  enemiesJson.enemies.forEach((enemy: any) => {
    enemies.push(
      new Enemy(
        enemy.id,
        enemy.name,
        enemy.hp,
        enemy.mp,
        enemy.str,
        enemy.int,
        enemy.def,
        enemy.res,
        enemy.spd,
        enemy.luck,
        enemy.race,
        enemy.class,
        enemy.rarity
      )
    );
  });
  return enemies;
}

// Get boss characteristics from Json files
export function getBossesFromJson() {
  const bosses: Boss[] = [];
  bossesJson.bosses.forEach((boss: any) => {
    bosses.push(
      new Boss(
        boss.id,
        boss.name,
        boss.hp,
        boss.mp,
        boss.str,
        boss.int,
        boss.def,
        boss.res,
        boss.spd,
        boss.luck,
        boss.race,
        boss.class,
        boss.rarity
      )
    );
  });
  return bosses;
}

// function managing game results messages (number of damage, healing)
export function displayActionMessages(entity: Entity, choice: string) {
  if (entity instanceof Enemy || entity instanceof Boss) {
    if (choice === "1") {
      console.log(
        `🗡️  ${colors.fg.red + entity.name + colors.reset} attacked and dealt ${
          colors.fg.red + entity.str
        } damages 🗡️${colors.reset}`
      );
    } else {
      console.log(
        `✨  ${colors.fg.red + entity.name + colors.reset} ${
          colors.fg.green
        }healed ✨${colors.reset}`
      );
    }
  } else if (entity instanceof Player) {
    if (choice === "1") {
      console.log(
        `🗡️  ${
          colors.fg.green + entity.name + colors.reset
        } attacked and dealt ${colors.fg.red + entity.str} damages 🗡️${
          colors.reset
        }`
      );
    } else {
      console.log(
        `✨  ${colors.fg.green + entity.name + colors.reset} ${
          colors.fg.green
        }healed ✨${colors.reset}`
      );
    }
  }
}

// function to do randomness
export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// function to manage player and enemy choices
export function startFighting(player: Entity, enemy: Entity, floor: number) {
  displayFightInterface(player, enemy, floor + 1);

  if (player.choice !== "") {
    displayActionMessages(player, player.choice);
  }

  if (enemy.choice !== "") {
    displayActionMessages(enemy, enemy.choice);
  }

  player.choice = getPlayerChoice();
  enemy.choice = getRandomChoice();

  player.play(enemy, player.choice);

  if (enemy.isAlive) {
    enemy.play(player, enemy.choice);
  }
}
