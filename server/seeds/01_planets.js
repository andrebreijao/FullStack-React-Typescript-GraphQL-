exports.seed = function (knex) {
  // Deletes ALL existing entries
  const obj = [
    {
      name: "Tatooine",
      description:
        "Tatooine is a sparsely inhabited circumbinary desert planet located in the galaxy's Outer Rim Territories.",
      code: "XT-FOE-43",
      picture_url:
        "https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg",
    },
    {
      name: "Aargau",
      description:
        "Aargau is a planet in the Zug system of the Core Worlds region, not far from Coruscant and the Corellian Run.",
      code: "FN-BBA-22",
      picture_url:
        "https://static.wikia.nocookie.net/starwars/images/a/a9/Aargau.jpg",
    },
    {
      name: "Malastare",
      description:
        "Malastare is the high-gravity homeworld of the quadrupedal Dug race, on the Hydian Way.",
      code: "EM-PVA-98",
      picture_url:
        "https://static.wikia.nocookie.net/starwars/images/d/df/MalastareNEGAS.jpg",
    },
  ];
  return knex("planets")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("planets").insert([...obj]);
    });
};
