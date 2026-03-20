import StatusLabel, { Status } from './components/status-label';

export default function Home() {
  return (
    <div className=''>
      <main className=''>
        <h1 className='text-xl'>Home Page</h1>
        <StatusLabel status={Status.Active}>Active</StatusLabel>
        <StatusLabel status={Status.NotActive} disabled>
          Not Active
        </StatusLabel>
        <StatusLabel status={Status.Pending}>Pending</StatusLabel>
        <StatusLabel status={Status.Suspended}>Suspended</StatusLabel>
      </main>
    </div>
  );
}
