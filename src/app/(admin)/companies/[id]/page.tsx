import { notFound } from 'next/navigation';

export interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number.parseInt(id, 10);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  return (
    <div className='py-6 px-10'>
      <p>{`Information about company (${params.id})`}</p>
    </div>
  );
}
