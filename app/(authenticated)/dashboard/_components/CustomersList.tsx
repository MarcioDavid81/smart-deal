import { CustomerProps } from "@/types"

interface CustomersProps {
    customers: CustomerProps[]
}

const CustomersList = ({customers}: CustomersProps) => {
    return (
        <div>
            <div>Lista de Clientes</div>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>{customer.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default CustomersList