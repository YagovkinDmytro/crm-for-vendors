import clsx from 'clsx';
import { CompanyStatus } from '@/lib/api';

export interface StatusLabelProps {
  status: CompanyStatus;
  disabled?: boolean;
}

const labelByStatus = {
  [CompanyStatus.Active]: 'Active',
  [CompanyStatus.NotActive]: 'Not Active',
  [CompanyStatus.Pending]: 'Pending',
  [CompanyStatus.Suspended]: 'Suspended',
};

export default function StatusLabel({ status, disabled }: StatusLabelProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center py-1 px-3.5 rounded-3xl text-sm font-medium',
        status === CompanyStatus.Active && 'text-[#15803d] bg-[#dcfce7]',
        status === CompanyStatus.NotActive && 'text-[#b91c1c] bg-[#fee2e2]',
        status === CompanyStatus.Pending && 'text-[#c2410c] bg-[#ffedd5]',
        status === CompanyStatus.Suspended && 'text-[#1d4ed8] bg-[#dbeafe]',
        {
          ['opacity-75 cursor-not-allowed']: disabled,
        },
      )}
    >
      <div className='w-1 h-1 mr-2 rounded-full bg-current' />
      {labelByStatus[status]}
    </div>
  );
}
