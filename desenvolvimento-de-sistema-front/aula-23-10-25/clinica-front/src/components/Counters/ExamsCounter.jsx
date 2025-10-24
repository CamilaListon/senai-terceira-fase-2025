import { useState, useEffect } from 'react'
import  axios  from 'axios'
import { FaHospitalUser } from 'react-icons/fa'

const ExamsCounter = () => {
    const [examstCount, setExamstCount] = useState(0)

    const fetchExams = async () => {
        try {
            const response = await axios.get("http://localhost:3000/exams");
            setExamstCount(response.data.length)
        } catch (error) {
            console.error("Erro ao obter dados dos exames", error)
        }
    }

    useEffect(() => {
        fetchExams()
    }, [])

    return (
        <div
            className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
            <h2 className='text-xl font-bold flex items-center gap-2'>
                <FaHospitalUser className='text-blue-600' />{examstCount}
            </h2>
            <p className='text-gray-600 mt-2'>Pacientes</p>
        </div>
    )
}

export default ExamsCounter