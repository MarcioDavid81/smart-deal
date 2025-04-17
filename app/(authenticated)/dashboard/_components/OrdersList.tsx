import { OrderProps } from "@/types"
import { formatDate } from "@/utils/date"

interface OrdersProps {
    orders: OrderProps[]
}

const OrdersList = ({ orders }: OrdersProps) => {
    return (
        <div>
            <div>Lista de Pedidos</div>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>{order.number} {`${formatDate(order.date)}`}</li>
                ))}
            </ul>
        </div>
    )
}

export default OrdersList