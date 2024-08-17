import { useNavigate } from 'react-router-dom';

const CustomCollapsedComponent = ({ toggleMore, action }: any) => {
  const navigate = useNavigate();
  const handleClick = () => {
    action('pause');
    navigate('/');
  };
  return (
    <div className="flex justify-center items-center mb-9">
      <button
        className="w-full max-w-[358px] py-[14px] px-[10px] bg-[#245BD3] mx-auto rounded-[8px]"
        onClick={handleClick}
      >
        Go to Website
      </button>
    </div>
  );
};

export default CustomCollapsedComponent;
