module.exports = (db) => {
  const photosSeedData = [
    {
      name: "headshot.jpg",
      albumId: 1,
      imageUrl: "/seed/headshot.jpg",
      awsUrl: null,
      mimetype: "image/jpeg",
      published: true,
    },
    {
      name: "skyline.jpg",
      albumId: 1,
      imageUrl: "/seed/skyline.jpg",
      mimetype: "image/jpeg",
      awsUrl: null,
      published: true,
    },
  ];

  db.photos
    .findAll()
    .then((data) => {
      if (data.length === 0) {
        db.photos
          .bulkCreate(photosSeedData)
          .then(() => {
            console.log("Seeded photos table.");
          })
          .catch((err) => {
            console.log("Failed to seed photos table: " + err.message);
          });
      }
    })
    .catch((err) => {
      console.log("Failed to find photos: " + err.message);
    });
};
