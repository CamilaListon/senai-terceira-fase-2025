
function Body() {
    const usuarios = [
        { nome: "Ana", idade: 22, cidade: "São Paulo" },
        { nome: "Bruno", idade: 30, cidade: "Florianópolis" },
        { nome: "Carlos", idade: 25, cidade: "Rio de Janeiro" },
    ]


    return (
        <main className={StyleSheet.body}>
            <h2>Usuarios Cadastrados:</h2>
            <div className={StyleSheet.cardContainer}>

            </div>

        </main>
    )
}

export default Body