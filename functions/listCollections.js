exports = function({ query, headers, body}, response) {
  const mongodb = context.services.get("Loflou333");
  const db = mongodb.db("sample_mflix");
  
  // Authenticate the connection
  return mongodb.auth.getCredentials()
    .then(credentials => {
      return db.listCollections().toArray()
        .then(collections => {
          const collectionNames = collections.map(collection => collection.name);
          
          response.setStatusCode(200);
          response.setHeader("Content-Type", "application/json");
          response.setBody(JSON.stringify(collectionNames));
        })
        .catch(err => {
          console.error("Failed to list collections:", err);
          response.setStatusCode(500);
          response.setBody(JSON.stringify({ error: err.message }));
        });
    })
    .catch(err => {
      console.error("Failed to authenticate:", err);
      response.setStatusCode(500);
      response.setBody(JSON.stringify({ error: "Authentication failed" }));
    });
};