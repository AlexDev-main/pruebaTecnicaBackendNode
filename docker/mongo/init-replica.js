try {
  rs.status();
  print("Replica set already initialized");
} catch (error) {
  if (error.codeName !== "NotYetInitialized") {
    throw error;
  }

  rs.initiate({
    _id: "rs0",
    members: [
      {
        _id: 0,
        host: "localhost:27017",
      },
    ],
  });

  print("Replica set initialized");
}