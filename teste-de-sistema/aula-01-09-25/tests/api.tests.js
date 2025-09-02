// import jsonserver from "json-server"

// let server;

// beforeAll((done) => {
//     const app = jsonserver.create();
//     const routes = jsonserver.router("db.json")
//     const middleware = jsonserver.defaults();

//     app.use(routes)
//     app.use(middleware)

//     server = app.listen(4000, done)
// });

// afterAll(() => {
//     server.close();
// })

test("/get - pegar os meus users", async () =>{
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json()
    expect(Array.isArray(data)).tobe(true);
})

test(":getByID", async() => {
    const res = await fetch("http://localhost:3000/users/2");
    const data = await res.json();
    expect(data).toHaveProperty("id",2)

})