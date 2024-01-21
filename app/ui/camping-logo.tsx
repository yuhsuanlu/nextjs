import { SunIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function CampingLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <SunIcon className="h-12 w-12" />
      <p className="text-[32px]">Camping</p>
    </div>
  );
}
