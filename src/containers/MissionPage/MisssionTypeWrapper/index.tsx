import React from 'react';

type Props = {
  title: string;
  isPartner?: boolean;
};

const MisstionTypeWrapper: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  title,
  isPartner,
}) => {
  return (
    <div className="bg-[#111] p-3 rounded-xl">
      <h3 className={`text-white ${isPartner ? 'text-sm font-semibold capitalize' : 'text-lg font-bold uppercase'}`}>{title}</h3>
      {children}
    </div>
  );
};

export default MisstionTypeWrapper;
