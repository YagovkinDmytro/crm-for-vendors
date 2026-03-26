import AddCompanyButton from './components/add-company-button';
import StatusLabel, { Status } from './components/status-label';

export default async function Home() {
  return (
    <main className=''>
      <h1 className='text-xl'>Home Page {new Date().toTimeString()}</h1>
      <StatusLabel status={Status.Active}>Active</StatusLabel>
      <StatusLabel status={Status.NotActive} disabled>
        Not Active
      </StatusLabel>
      <StatusLabel status={Status.Pending}>Pending</StatusLabel>
      <StatusLabel status={Status.Suspended}>Suspended</StatusLabel>
      <AddCompanyButton />
    </main>
  );
}
