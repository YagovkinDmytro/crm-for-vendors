import React from 'react';
import clsx from 'clsx';

export enum Status {
  Active = 'active',
  NotActive = 'notActive',
  Pending = 'pending',
  Suspended = 'suspended',
}

export interface StatusLabelProps {
  children: React.ReactNode;
  status: Status;
  disabled?: boolean;
}

export default function StatusLabel({
  children,
  status,
  disabled,
}: StatusLabelProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center py-1 px-3.5 rounded-3xl text-sm font-medium',
        status === Status.Active && 'text-[#15803d] bg-[#dcfce7]',
        status === Status.NotActive && 'text-[#b91c1c] bg-[#fee2e2]',
        status === Status.Pending && 'text-[#c2410c] bg-[#ffedd5]',
        status === Status.Suspended && 'text-[#1d4ed8] bg-[#dbeafe]',
        {
          ['opacity-55 cursor-not-allowed']: disabled,
        },
      )}
    >
      <div className='w-1 h-1 mr-2 rounded-full bg-current' />
      {children}
    </span>
  );
}
