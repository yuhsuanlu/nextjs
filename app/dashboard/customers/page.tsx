import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Customers',
};
import Table from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';
import { fetchCustomersPages } from '@/app/lib/data';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCustomersPages(query);
    const customers = await fetchFilteredCustomers(query, currentPage);

    return (
        <div className="w-full">
            <Table customers={customers} currentPage={currentPage} />
            <div className="mt-5 flex w-full justify-center">
                {<Pagination totalPages={totalPages} />}
            </div>
        </div>
    );
}