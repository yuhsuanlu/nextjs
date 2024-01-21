import CampingLogo from '@/app/ui/camping-logo';
import SignupForm from '@/app/ui/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Signup',
};

export default function SignupPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[650px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-lime-700 p-3 md:h-36">
                    <div className="text-white">
                        <CampingLogo />
                    </div>
                </div>
                <SignupForm />
            </div>
        </main>
    );
}