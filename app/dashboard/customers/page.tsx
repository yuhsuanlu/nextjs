import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import CustomersList from '@/app/ui/customers/customers-list';
export const metadata: Metadata = {
    title: 'Customers',
};
import Table from '@/app/ui/customers/table';
import { fetchCustomers } from '@/app/lib/data';
import {
    FormattedCustomersTable,
} from '@/app/lib/definitions';

import {
    CustomersTableType,
} from '@/app/lib/definitions';

import { fetchFilteredCustomers } from '@/app/lib/data';

import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
// import Table from '@/app/ui/invoices/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';

// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Invoices',
// };

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
    const totalPages = await fetchInvoicesPages(query);
    const customers = await fetchFilteredCustomers(query);
    return (
        <div className="w-full">
            {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                {<Pagination totalPages={totalPages} />}
            </div> */}
            <Table customers={customers} currentPage={currentPage} />
            <div className="mt-5 flex w-full justify-center">
                {<Pagination totalPages={totalPages} />}
            </div>
        </div>
    );
}