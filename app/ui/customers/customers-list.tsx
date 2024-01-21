import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function CustomersList() {
    const customers = await fetchCustomers();
    // console.log(customers);
    return (
        <>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name}
                        {/* Add more details or actions as needed */}
                    </li>
                ))}
            </ul>
        </>
    );
}
