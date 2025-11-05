import { useState, useEffect } from 'react';
import axios from 'axios'; // Importação explícita do axios

// --- Função de Cálculo de Idade ---
/**
 * Calcula a idade em anos com base na data de nascimento fornecida no formato DD-MM-YYYY.
 * @param {string} birthdateString Data de nascimento no formato "DD-MM-YYYY".
 * @returns {number|string} Idade em anos ou 'N/A' se a data for inválida.
 */
const calculateAge = (birthdateString) => {
    if (!birthdateString) return 'N/A';

    // Assumindo o formato DD-MM-YYYY e convertendo para o formato Mês-Dia-Ano (MM/DD/YYYY)
    const parts = birthdateString.split('-');
    if (parts.length !== 3) return 'N/A';

    // Cria a data no formato Mês/Dia/Ano para evitar problemas de fuso horário
    const birthDate = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);

    if (isNaN(birthDate)) return 'N/A';

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Verifica se o aniversário já ocorreu neste ano
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};
// ------------------------------------


// Componente do Ícone de Usuário (substituindo o Avatar)
const UserIcon = ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);


// O componente principal para a aplicação de arquivo único
const PatientQuickInfoList  = () => { // Renomeado de PatientQuickInfoList para App
    // Estado para armazenar a lista de pacientes
    const [patients, setPatients] = useState([]);
    // Estado para o termo de busca
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para simular o carregamento
    const [isLoading, setIsLoading] = useState(true);
    // Novo estado para gerenciar erros
    const [error, setError] = useState(null);

    // Função para buscar os dados de pacientes usando axios.get
    const loadPatients = async () => {
        setIsLoading(true);
        setError(null); // Limpa erros anteriores
        
        try {
            const url = "http://localhost:3000/patients";
            
            console.log(`Fazendo requisição GET para: ${url} usando axios.get`);

            // Usando axios.get
            const response = await axios.get(url); 

            // Os dados da resposta HTTP estão em response.data
            setPatients(response.data);
            console.log("Dados de pacientes carregados com sucesso (via axios).");
            
        } catch (err) {
            console.error("Erro ao obter os dados do paciente:", err);

            // Tratamento de erro específico para Axios
            if (axios.isAxiosError(err) && err.response) {
                // Erro de resposta do servidor (código de status 4xx ou 5xx)
                setError(`Erro HTTP ${err.response.status}. Verifique se o servidor da API está rodando em http://localhost:3000.`);
            } else if (axios.isAxiosError(err) && err.request) {
                // Erro de rede/conexão (a requisição foi feita, mas não houve resposta)
                setError("Erro de rede. O servidor não respondeu. Verifique a URL e a conexão.");
            } else {
                // Outros erros (configuração, etc.)
                setError(err.message || "Ocorreu um erro desconhecido durante a requisição.");
            }
            setPatients([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Chamada da função de busca na montagem do componente
    useEffect(() => {
        loadPatients();
    }, []); // Array de dependência vazio garante que roda apenas uma vez

    // Lida com a mudança no campo de busca
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Lógica de filtragem aprimorada
    const filteredPatients = patients.filter((patient) => {
        const term = searchTerm.toLowerCase();
        // A busca agora inclui o telefone formatado (removendo -)
        const patientPhone = (patient.phone || '').replace(/[^0-9]/g, '');
        const searchPhone = term.replace(/[^0-9]/g, '');

        return (
            // Busca por nome completo, email ou telefone
            (patient.fullName || '').toLowerCase().includes(term) ||
            (patient.email || '').toLowerCase().includes(term) ||
            patientPhone.includes(searchPhone)
        );
    });

    // Componente que representa cada item da lista de pacientes
    const PatientListItem = ({ patient }) => {
        const age = calculateAge(patient.birthdate);

        return (
            <li className="flex items-start justify-between py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150 ease-in-out">
                {/* Seção Esquerda (Ícone, Nome, Contato) */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="pt-1 text-cyan-600">
                        <UserIcon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        {/* Nome do Paciente (Maior) */}
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                            {patient.fullName}
                        </h3>

                        {/* Email e Telefone */}
                        <p className="text-sm text-gray-600 truncate">{patient.email}</p>
                        <p className="text-sm text-gray-600 truncate">{patient.phone}</p>
                    </div>
                </div>

                {/* Seção Direita (Idade, Plano, Detalhes) */}
                <div className="flex flex-col items-end text-right ml-4">
                    {/* Idade: AGORA CALCULADA DINAMICAMENTE */}
                    <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                        <span className="font-bold">Idade:</span> {age} {age !== 'N/A' && 'anos'}
                    </p>

                    {/* Plano */}
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                        <span className="font-bold">Plano:</span> {patient.healthInsurance}
                    </p>

                    {/* Link "Ver detalhes" */}
                    {/* Usamos <a> para simular o Link de um router no ambiente de arquivo único */}
                    <a
                        href={`/paciente/${patient.id}`}
                        className="mt-1 text-sm font-semibold text-cyan-600 hover:text-cyan-800 transition duration-150 ease-in-out"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log(`Navegar para detalhes do paciente: ${patient.id}`);
                            // Aqui seria a navegação real (e.g., history.push)
                        }}
                    >
                        Ver detalhes →
                    </a>
                </div>
            </li>
        )
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-['Inter']">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-8">
                {/* Cabeçalho */}
                <h1 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-6 border-b pb-2">
                    Informações Rápidas de Pacientes
                </h1>

                {/* Área de Busca */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <label htmlFor="search" className="text-gray-700 font-medium whitespace-nowrap">
                        Buscar Paciente:
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Digite o nome, email ou telefone"
                        className="w-full md:w-3/4 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-150 ease-in-out"
                        aria-label="Buscar Paciente"
                    />
                </div>

                {/* Área de Erro (se houver) */}
                {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                        {error}
                    </div>
                )}

                {/* Lista de Resultados */}
                <div className="mt-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                            <p className="ml-3 text-cyan-700">Carregando pacientes...</p>
                        </div>
                    ) : filteredPatients.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {filteredPatients.map((patient) => (
                                <PatientListItem key={patient.id} patient={patient} />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600 p-10 bg-gray-50 rounded-lg">
                            Nenhum paciente encontrado com o termo "{searchTerm}".
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientQuickInfoList ;