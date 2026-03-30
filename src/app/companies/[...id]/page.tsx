import Header from '@/app/components/header';

export interface PageProps {
  params: { id: string[] };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <Header>Companies({String(id)})</Header>
      <p>{new Date().toTimeString()}</p>
    </>
  );
}
