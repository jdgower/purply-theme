"use strict";

/**
 * A playful, chaotic JavaScript showcase file to stress-test theme colors.
 * - Includes: classes (with private fields), async/await, generators, proxies,
 *   regex (named groups), destructuring, maps/sets, symbols, tagged templates,
 *   BigInt, optional chaining, nullish coalescing, errors, and some dad jokes.
 * - Runs in Node with no dependencies. Prints colorful nonsense to stdout.
 */

// Constants and primitives
const PI = Math.PI;
const MAX_SAFE = Number.MAX_SAFE_INTEGER;
const GALACTIC_BEAN_COUNT = 42n; // BigInt because regular integers were afraid
const emoji = { taco: "🌮", rocket: "🚀", wizard: "🧙" };

// Symbols and unique keys
const SECRET = Symbol("secretSauce");

// Tagged template to demonstrate highlighting
function sprinkle(strings, ...values) {
  return strings.reduce((acc, part, i) => acc + part + (values[i] ?? "✨"), "");
}

// Regex with named capture groups
const emailRegex = /^(?<user>[\w.-]+)@(?<domain>[\w.-]+)\.(?<tld>[a-z]{2,})$/i;

// Utility: pseudo async delay
const sleep = (ms = 10) => new Promise((resolve) => setTimeout(resolve, ms));

// Custom Error
class DadJokeError extends Error {
  constructor(message, code = "DAD_JOKE_TOO_STRONG") {
    super(message);
    this.name = "DadJokeError";
    this.code = code;
  }
}

// Base class with private field and static factory
class Person {
  #mood = "mysterious";

  constructor(name, age) {
    this.name = name;
    this.age = age ?? 9001; // it's over 9000
    this[SECRET] = sprinkle`classified-${name}-${age}`;
  }

  get mood() {
    return this.#mood;
  }

  set mood(value) {
    this.#mood = String(value).toLowerCase();
  }

  sayHi() {
    return `Hi, I'm ${this.name} and my mood is ${this.mood}. ${emoji.wizard}`;
  }

  static fromObject({ name, age }) {
    return new Person(name, age);
  }
}

// Mixin-ish helper
const CanTellJokes = (Base) =>
  class extends Base {
    tellJoke() {
      const jokes = [
        "Why did the function get canceled? Because it had too many side effects.",
        "I told my computer I needed a break, and it said: 'No problem, I'll go to sleep.'",
        "A closure walks into a bar and says: 'I'll have what she's having.'",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
  };

class Developer extends CanTellJokes(Person) {
  constructor(name, age, favoriteStack = "JS/Node") {
    super(name, age);
    this.favoriteStack = favoriteStack;
  }

  codeReview({ filesChanged = 0, shipIt = false } = {}) {
    if (filesChanged > 9000)
      throw new DadJokeError("Too many changes. Refactor?", "MERGE_PANIC");
    return shipIt ? "LGTM 🚢" : `Needs work (${filesChanged} files).`;
  }
}

// Generators
function* idGenerator(start = 1) {
  let current = start;
  while (true) yield current++;
}

async function* asyncJokeStream(limit = 3) {
  for (let i = 0; i < limit; i++) {
    await sleep(5);
    yield `Joke #${i + 1}: ${new Developer("Ava").tellJoke()}`;
  }
}

// Proxy for dramatic settings
const settings = new Proxy(
  { theme: "purply", volume: 11, experimental: true },
  {
    get(target, prop) {
      if (!(prop in target)) {
        console.warn(`Setting '${String(prop)}' does not exist. ${emoji.taco}`);
        return undefined;
      }
      return target[prop];
    },
    set(target, prop, value) {
      if (prop === "volume" && value > 11) {
        console.warn("This one goes to 11. That's the joke.");
        target[prop] = 11;
        return true;
      }
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      return Reflect.has(target, prop);
    },
  }
);

// Map/Set/WeakMap usage
const userIdToUser = new Map();
const uniqueStacks = new Set(["JS", "TS", "Rust", "JS"]);
const secrets = new WeakMap();

// Destructuring playground
const defaultConfig = { theme: "purply", tabSize: 2, minions: ["lint", "fmt"] };
const userConfig = { tabSize: 4, minions: ["test"], bonus: true };
const merged = {
  ...defaultConfig,
  ...userConfig,
  minions: [...defaultConfig.minions, ...userConfig.minions],
};
const { theme: chosenTheme, tabSize, minions: chores } = merged;

// Tagged template demo
const fancy = (label, value) => sprinkle`[${label}]: ${value}`;

// JSON helpers
function safeStringify(value) {
  const cache = new Set();
  const replacer = (_, v) => {
    if (typeof v === "object" && v !== null) {
      if (cache.has(v)) return "[Circular]";
      cache.add(v);
    }
    if (typeof v === "bigint") return `${v}n`;
    if (typeof v === "symbol") return v.description;
    return v;
  };
  return JSON.stringify(value, replacer, 2);
}

// Date and Intl formatting
const now = new Date();
const formattedDate = new Intl.DateTimeFormat("en", {
  dateStyle: "full",
  timeStyle: "long",
}).format(now);
const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

// Iterable custom object
const snackBowl = {
  snacks: ["chips", "pretzels", "debug cookies"],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => ({
        value: this.snacks[index++],
        done: index > this.snacks.length,
      }),
    };
  },
};

async function main() {
  console.log("==== Purply Theme Showcase ====\n");

  console.log(fancy("PI", PI.toFixed(4)));
  console.log(fancy("MAX_SAFE", MAX_SAFE));
  console.log(fancy("GALACTIC_BEAN_COUNT", GALACTIC_BEAN_COUNT));
  console.log(fancy("EMOJI", Object.values(emoji).join(" ")));

  // Classes, private fields, getters/setters
  const dev = new Developer("Zoe", 29, "Node/TS");
  dev.mood = "Optimistic";
  console.log(dev.sayHi());
  console.log("Favorite stack:", dev.favoriteStack);

  // Proxies
  console.log("Theme via proxy:", settings.theme);
  settings.volume = 9000; // will clamp to 11
  console.log("Volume via proxy:", settings.volume);

  // Maps, Sets, WeakMaps
  const idGen = idGenerator(101);
  const idA = idGen.next().value;
  const idB = idGen.next().value;
  userIdToUser.set(idA, dev);
  userIdToUser.set(idB, Person.fromObject({ name: "Sam", age: 33 }));
  secrets.set(dev, "loves semicolons");
  console.log("Users in map:", [...userIdToUser.keys()].join(", "));
  console.log("Unique stacks:", [...uniqueStacks].join(" | "));

  // Destructuring and spread
  console.log(
    "Chosen theme:",
    chosenTheme,
    "tabSize:",
    tabSize,
    "chores:",
    chores.join(", ")
  );

  // Optional chaining and nullish coalescing
  const maybeConfig = { nested: null };
  console.log("Optional chaining:", maybeConfig.nested?.value ?? "nope");

  // Regex with named groups
  const testEmail = "the.wizard@purply.dev";
  const match = emailRegex.exec(testEmail);
  console.log(
    "Regex groups:",
    match?.groups?.user,
    match?.groups?.domain,
    match?.groups?.tld
  );

  // Tagged templates
  console.log(
    sprinkle`Today is ${formattedDate}. Your wallet says ${formatMoney(12.34)}.`
  );

  // Async/await, errors, Promise.allSettled
  const tasks = [
    (async () => (await sleep(5), "done: nap"))(),
    (async () => (await sleep(2), "done: snack"))(),
    (async () => {
      await sleep(1);
      if (Math.random() < 0.2)
        throw new DadJokeError(
          "I would tell you a UDP joke, but you might not get it."
        );
      return "done: code";
    })(),
  ];
  const results = await Promise.allSettled(tasks);
  console.log(
    "Results:",
    results
      .map((r) => (r.status === "fulfilled" ? r.value : r.reason.code))
      .join(" | ")
  );

  // Iterables
  console.log("Snack bowl:", [...snackBowl].join(", "));

  // Async generator
  for await (const joke of asyncJokeStream(3)) {
    console.log(joke);
  }

  // Destructure with defaults and renaming
  const response = {
    data: { user: { id: idA, name: dev.name } },
    meta: { ts: Date.now() },
  };
  const {
    data: {
      user: { id: userId, name: displayName = "Anonymous" },
    },
    meta: { ts: timestamp },
  } = response;
  console.log(
    `User ${userId} is ${displayName} at ${new Date(
      timestamp
    ).toLocaleTimeString()}`
  );

  // JSON stringify with customizer
  const circular = { a: 1 };
  circular.self = circular;
  console.log(
    "JSON:",
    safeStringify({ dev, circular, settings, secretSauce: dev[SECRET] })
  );

  // Bitwise silliness
  const flags = 0b1010;
  console.log("Flags on?", (flags & 0b0010) !== 0 ? "yes" : "no");

  // Final punchline
  try {
    console.log(
      "Code review:",
      dev.codeReview({
        filesChanged: Math.floor(Math.random() * 5),
        shipIt: true,
      })
    );
  } catch (err) {
    console.error("Review failed:", err.message);
  }

  console.log("\n==== End Showcase ", emoji.rocket);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Catastrophic giggle failure:", error);
    process.exitCode = 1;
  }
})();
