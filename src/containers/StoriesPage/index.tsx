import ReactInstaStories from 'react-insta-stories';
import { Story } from 'react-insta-stories/dist/interfaces';
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
  return (
    <div className="w-full max-w-md mx-auto h-screen">
      <ReactInstaStories
        stories={stories}
        width="100%"
        height="100%"
        loop
        storyInnerContainerStyles={{
          minHeight: '100vh',
        }}
        progressWrapperStyles={{
          height: '5px',
          borderRadius: '2.5px;',
        }}
      />
    </div>
  );
};

export default StoriesPage;
