import HookImage from 'assets/images/hook-color.png';
import InviteGroup from './InviteGroup';
type Props = {};

const MockFriends = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Mike Johnson',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Emily Brown',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Alex Wilson',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Sarah Davis',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Mike Johnson',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Emily Brown',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Alex Wilson',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Sarah Davis',
    image: 'https://via.placeholder.com/150',
  },
];
const FriendsPage = (props: Props) => {
  return (
    <div className="relative px-4 pt-8 overflow-y-auto h-full">
      <h1 className="text-center text-2xl font-medium">
        Invite friends
        <br />
        and get more BAITS
      </h1>
      <div className="flex justify-center mt-5">
        <img src={HookImage} alt="hook" />
      </div>
      <div>
        <p>5 friends</p>
        <div className='mt-6'>
          {MockFriends.map((friend, index) => (
            <div key={index} className={`flex items-center justify-between ${index !== MockFriends.length - 1 ? 'mb-6' : ''}`}>
              <div>
                <img className="w-10 h-10 rounded-full" src={friend.image} alt={friend.name} />
              </div>
              <div className='flex-1 px-4'>
                <p>{friend.name}</p>
              </div>
              <div>
                <p>+123 BAITS</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InviteGroup />
    </div>
  );
};

export default FriendsPage;
