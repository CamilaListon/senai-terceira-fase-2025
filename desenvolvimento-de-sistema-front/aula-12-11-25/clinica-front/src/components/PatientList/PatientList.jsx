import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import PatientQuickInfoList from '../PatientQuickInfoList/PatientQuickInfoList'

const PatientList = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const fetchPatients = async () => {
        try {
            const response = await axios.get("http://localhost:3000/patients");
            setPatients(response.data)
        } catch (error) {
            console.error("Erro ao obter os dados do paciente", error)
        }
    }

    useEffect(() => {

    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredPatients = patients.filter((patient) => {
        return (
            patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().includes(searchTerm)
        )
    })

    return (
        <>
        <PatientQuickInfoList/>
        </>
        // <section className='p-6 bg-gray-50 rounded-lg shadow-md'>
        //     <h2 className='text-2x-l font-bold mb-6 text-gray-800'>
        //         Informações Rapidas do Paciente
        //     </h2>

        //     {/* campo de busca */}

        //     <div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 justify-between'>
        //         <label htmlFor="search" className='text-gray-700 font-medium'>
        //             Buscar Paciente:
        //         </label>
        //         <input
        //             type="text"
        //             id='search'
        //             value={searchTerm}
        //             onChange={handleSearchChange}
        //             placeholder='Digite o nome, email ou telefone'
        //             className='w-full sm:w1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600'
        //         />
        //     </div>

        //     {/* Lista de Pacientes */}
        //     <ul className='space-y-4'>
        //         {
        //             filteredPatients.length > 0 ? (
        //                 filteredPatients.map((patient) => (
        //                     <li
        //                         key={patient.id}
        //                         className='p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow'>
        //                         <p className='text-sm text-gray-700'>
        //                             <strong className='text-gray-700'>Registro:</strong> {patient.id}
        //                         </p>

        //                         <link
        //                             to={`/paciente/${patient.id}`}
        //                             className='inline-block mt-2 text-cyan-700 font-semibold hover:underline'
        //                         >Ver detalhes
        //                         </link>
        //                     </li>
        //                 ))
        //             ) : (
        //                 <p className='text-gray-600'>Nenhum paciente encontrado.</p>
        //             )
        //         }
        //     </ul>

        // </section>
    )









    return (
        <div>PatientList</div>
    )
}

export default PatientList