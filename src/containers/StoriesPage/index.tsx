import { useSharkStore } from '@/stores/shark_store';
import { useTonWallet } from '@tonconnect/ui-react';
import ReactInstaStories from 'react-insta-stories';
import { Story } from 'react-insta-stories/dist/interfaces';
import { Navigate } from 'react-router-dom';
import Stories_1 from './Stories1/Stories_1';
import Stories_2 from './Stories2';
type Props = {};

const stories: Story[] = [
  {
    content: Stories_1,
    seeMore: () => <></>,
  },
  {
    content: Stories_2,
    seeMore: () => <></>,
  },
];
const StoriesPage = (props: Props) => {
  const { user } = useSharkStore();
  const tonWallet = useTonWallet();
  const rawWallet = tonWallet?.account?.address;
  const objUserWalletParsed = JSON.parse(user?.wallet || '{}');
  const isWalletMatch = !!rawWallet && !!objUserWalletParsed[rawWallet];

  if (!isWalletMatch) return <Navigate to="/" />;

  return (
    <div className="w-full max-w-md mx-auto h-screen">
      <div className="relative w-full max-w-md mx-auto h-screen">
        <img src="/liquid.gif" className="absolute inset-0 w-full h-full object-cover z-10" />
        <div className="relative z-10 w-full h-full">
          <ReactInstaStories
            stories={stories}
            width="100%"
            height="100%"
            loop
            storyContainerStyles={{
              background: 'transparent',
            }}
            storyInnerContainerStyles={{
              background: 'transparent',
              minHeight: '100vh',
            }}
            progressWrapperStyles={{
              height: '5px',
              borderRadius: '2.5px;',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
