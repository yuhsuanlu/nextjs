'use server'; // mark all the exported functions within the file as server functions. 
// These server functions can then be imported into Client and Server components, making them extremely versatile.
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// Invoice
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Customer
const CustomerFormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please input customer name.',
    }).min(1),
    email: z.string({
        invalid_type_error: 'Please input customer email.',
    }).min(1),
    image_url: z.string({
        invalid_type_error: 'Please upload customer image.',
    }).min(1),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });

// Sign up
const SignupFormSchema = z.object({
    id: z.string(),
    email: z.string({
        invalid_type_error: 'Please input email.',
    }).min(1),
    password: z.string({
        invalid_type_error: 'Please input password.',
    }).min(1),
});

const SignupUser = SignupFormSchema.omit({ id: true });

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export type CustomerState = {
    errors?: {
        name?: string[];
        email?: string[];
        image_url?: string[];
    };
    message?: string | null;
};

export type SignupState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

// createInvoice action to accept two parameters:
// formData - same as before.
// prevState - contains the state passed from the useFormState hook. You won't be using it in the action in this example, but it's a required prop.
export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0]; // format "YYYY-MM-DD"

    try {
        // update the data displayed in the database
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Once the database has been updated, the /dashboard/invoices path will be revalidated, 
    // and fresh data will be fetched from the server.
    revalidatePath('/dashboard/invoices');
    // redirect the user back to the /dashboard/invoices page. 
    redirect('/dashboard/invoices');

}

export async function createCustomer(
    prevState: CustomerState,
    formData: FormData
) {
    const validatedFields = CreateCustomer.safeParse({
        name: formData.get('customerName'),
        email: formData.get('customerEmail'),
        image_url: formData.get('customerImage'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.',
        };
    }

    // Prepare data for insertion into the database
    const { name, email, image_url } = validatedFields.data;

    try {
        await sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, ${image_url});
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Customer.',
        };
    }
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function updateCustomer(
    id: string,
    prevState: CustomerState,
    formData: FormData
) {
    const validatedFields = CreateCustomer.safeParse({
        name: formData.get('customerName'),
        email: formData.get('customerEmail'),
        image_url: formData.get('customerImage'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Customer.',
        };
    }

    // Prepare data for insertion into the database
    const { name, email, image_url } = validatedFields.data;

    try {
        await sql`
        UPDATE customers
        SET name = ${name}, email = ${email}, image_url = ${image_url}
        WHERE id = ${id}
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Customer.',
        };
    }
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function createSignupUser(prevState: SignupState, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = SignupUser.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { email, password } = validatedFields.data;

    try {
        // update the data displayed in the database
        await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${password})
    `;
        alert("Sign up successfully. Please log in now.");
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/login');
    redirect('/login');

}

export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData
) {
    // Validate form fields using Zod
    const validatedFields = UpdateInvoice.safeParse({ // safeParse() will return an object containing either a success or error field. 
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Invoice.',
        };
    }

    // Calling revalidatePath to clear the client cache and make a new server request.
    revalidatePath('/dashboard/invoices');
    // Calling redirect to redirect the user to the invoice's page.
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {

    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Invoice.',
        };
    }

    // Calling revalidatePath will trigger a new server request and re-render the table.
    // revalidatePath('/dashboard/invoices');
    // Since this action is being called in the /dashboard/invoices path, you don't need to call redirect
}

export async function deleteCustomer(id: string) {

    try {
        await sql`DELETE FROM customers WHERE id = ${id}`;
        revalidatePath('/dashboard/customers');
        return { message: 'Deleted Customer.' };
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Customer.',
        };
    }

    // Calling revalidatePath will trigger a new server request and re-render the table.
    // revalidatePath('/dashboard/invoices');
    // Since this action is being called in the /dashboard/invoices path, you don't need to call redirect
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}