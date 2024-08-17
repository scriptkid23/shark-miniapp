import React from 'react';

type Props = {
  title: string;
};

const MisstionTypeWrapper: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <div className="bg-[#111] p-3 rounded-xl">
      <h3 className="text-white text-lg font-semibold uppercase">{title}</h3>
      {children}
    </div>
  );
};

export default MisstionTypeWrapper;
