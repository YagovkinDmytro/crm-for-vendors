'use client';

export interface ErrorComponentProps {
  errpr: Error;
}

export default function ErrorComponent({}: ErrorComponentProps) {
  return <div>Unenspected error inside slot sales</div>;
}
