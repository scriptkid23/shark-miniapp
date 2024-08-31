import HookImage from '@/assets/images/hook-color.png';
import InviteGroup from './InviteGroup';
import { useEffect, useState } from 'react';
import { fetchFriends } from '@/apis';
import { Avatar } from '@nextui-org/react';
import { getInitials, getRandomColor } from '@/utils';
type Props = {};

interface User {
  id: string;
  userName: string;
  wallet: string; // Hoặc có thể là object nếu wallet có cấu trúc JSON phức tạp
  codeInvite: string;
  point: number;
  isPremium: boolean;
  createdAt: string;
}

interface Invitation {
  id: number;
  inviterId: string;
  invitedUserId: string;
  createdAt: string;
  invitedUser: User;
}

const mockFriends: Invitation[] = [
  {
    id: 1,
    inviterId: 'user123',
    invitedUserId: 'friend1',
    createdAt: '2024-03-15T10:30:00Z',
    invitedUser: {
      id: 'friend1',
      userName: 'Alice Smith',
      wallet: '0x1234...5678',
      codeInvite: 'ALICE123',
      point: 500,
      isPremium: true,
      createdAt: '2024-01-01T00:00:00Z',
    },
  },
  {
    id: 2,
    inviterId: 'user123',
    invitedUserId: 'friend2',
    createdAt: '2024-03-14T15:45:00Z',
    invitedUser: {
      id: 'friend2',
      userName: 'Bob Johnson',
      wallet: '0x2345...6789',
      codeInvite: 'BOB456',
      point: 300,
      isPremium: false,
      createdAt: '2024-01-02T00:00:00Z',
    },
  },
  {
    id: 3,
    inviterId: 'user123',
    invitedUserId: 'friend3',
    createdAt: '2024-03-13T09:20:00Z',
    invitedUser: {
      id: 'friend3',
      userName: 'Charlie Brown',
      wallet: '0x3456...7890',
      codeInvite: 'CHARLIE789',
      point: 750,
      isPremium: true,
      createdAt: '2024-01-03T00:00:00Z',
    },
  },
  {
    id: 4,
    inviterId: 'user123',
    invitedUserId: 'friend4',
    createdAt: '2024-03-12T14:15:00Z',
    invitedUser: {
      id: 'friend4',
      userName: 'Diana Prince',
      wallet: '0x4567...8901',
      codeInvite: 'DIANA234',
      point: 600,
      isPremium: false,
      createdAt: '2024-01-04T00:00:00Z',
    },
  },
  {
    id: 5,
    inviterId: 'user123',
    invitedUserId: 'friend5',
    createdAt: '2024-03-11T11:30:00Z',
    invitedUser: {
      id: 'friend5',
      userName: 'Ethan Hunt',
      wallet: '0x5678...9012',
      codeInvite: 'ETHAN567',
      point: 450,
      isPremium: true,
      createdAt: '2024-01-05T00:00:00Z',
    },
  },
  {
    id: 6,
    inviterId: 'user123',
    invitedUserId: 'friend6',
    createdAt: '2024-03-10T16:45:00Z',
    invitedUser: {
      id: 'friend6',
      userName: 'Fiona Gallagher',
      wallet: '0x6789...0123',
      codeInvite: 'FIONA890',
      point: 350,
      isPremium: false,
      createdAt: '2024-01-06T00:00:00Z',
    },
  },
  {
    id: 7,
    inviterId: 'user123',
    invitedUserId: 'friend7',
    createdAt: '2024-03-09T13:00:00Z',
    invitedUser: {
      id: 'friend7',
      userName: 'George Costanza',
      wallet: '0x7890...1234',
      codeInvite: 'GEORGE123',
      point: 550,
      isPremium: true,
      createdAt: '2024-01-07T00:00:00Z',
    },
  },
  {
    id: 8,
    inviterId: 'user123',
    invitedUserId: 'friend8',
    createdAt: '2024-03-08T09:15:00Z',
    invitedUser: {
      id: 'friend8',
      userName: 'Hannah Baker',
      wallet: '0x8901...2345',
      codeInvite: 'HANNAH456',
      point: 400,
      isPremium: false,
      createdAt: '2024-01-08T00:00:00Z',
    },
  },
  {
    id: 9,
    inviterId: 'user123',
    invitedUserId: 'friend9',
    createdAt: '2024-03-07T14:30:00Z',
    invitedUser: {
      id: 'friend9',
      userName: 'Ian Gallagher',
      wallet: '0x9012...3456',
      codeInvite: 'IAN789',
      point: 700,
      isPremium: true,
      createdAt: '2024-01-09T00:00:00Z',
    },
  },
  {
    id: 10,
    inviterId: 'user123',
    invitedUserId: 'friend10',
    createdAt: '2024-03-06T11:45:00Z',
    invitedUser: {
      id: 'friend10',
      userName: 'Jessica Jones',
      wallet: '0x0123...4567',
      codeInvite: 'JESSICA012',
      point: 500,
      isPremium: false,
      createdAt: '2024-01-10T00:00:00Z',
    },
  },
  {
    id: 11,
    inviterId: 'user123',
    invitedUserId: 'friend11',
    createdAt: '2024-03-05T16:00:00Z',
    invitedUser: {
      id: 'friend11',
      userName: 'Kevin Malone',
      wallet: '0x1234...5678',
      codeInvite: 'KEVIN345',
      point: 300,
      isPremium: true,
      createdAt: '2024-01-11T00:00:00Z',
    },
  },
  {
    id: 12,
    inviterId: 'user123',
    invitedUserId: 'friend12',
    createdAt: '2024-03-04T10:30:00Z',
    invitedUser: {
      id: 'friend12',
      userName: 'Lila Pitts',
      wallet: '0x2345...6789',
      codeInvite: 'LILA678',
      point: 650,
      isPremium: false,
      createdAt: '2024-01-12T00:00:00Z',
    },
  },
  {
    id: 13,
    inviterId: 'user123',
    invitedUserId: 'friend13',
    createdAt: '2024-03-03T13:45:00Z',
    invitedUser: {
      id: 'friend13',
      userName: 'Michael Scott',
      wallet: '0x3456...7890',
      codeInvite: 'MICHAEL901',
      point: 800,
      isPremium: true,
      createdAt: '2024-01-13T00:00:00Z',
    },
  },
  {
    id: 14,
    inviterId: 'user123',
    invitedUserId: 'friend14',
    createdAt: '2024-03-02T09:00:00Z',
    invitedUser: {
      id: 'friend14',
      userName: 'Nancy Wheeler',
      wallet: '0x4567...8901',
      codeInvite: 'NANCY234',
      point: 450,
      isPremium: false,
      createdAt: '2024-01-14T00:00:00Z',
    },
  },
  {
    id: 15,
    inviterId: 'user123',
    invitedUserId: 'friend15',
    createdAt: '2024-03-01T15:15:00Z',
    invitedUser: {
      id: 'friend15',
      userName: 'Oscar Martinez',
      wallet: '0x5678...9012',
      codeInvite: 'OSCAR567',
      point: 550,
      isPremium: true,
      createdAt: '2024-01-15T00:00:00Z',
    },
  },
  {
    id: 16,
    inviterId: 'user123',
    invitedUserId: 'friend16',
    createdAt: '2024-02-29T11:30:00Z',
    invitedUser: {
      id: 'friend16',
      userName: 'Pam Beesly',
      wallet: '0x6789...0123',
      codeInvite: 'PAM890',
      point: 600,
      isPremium: false,
      createdAt: '2024-01-16T00:00:00Z',
    },
  },
  {
    id: 17,
    inviterId: 'user123',
    invitedUserId: 'friend17',
    createdAt: '2024-02-28T14:45:00Z',
    invitedUser: {
      id: 'friend17',
      userName: 'Quinn Fabray',
      wallet: '0x7890...1234',
      codeInvite: 'QUINN123',
      point: 350,
      isPremium: true,
      createdAt: '2024-01-17T00:00:00Z',
    },
  },
];

const FriendsPage = (props: Props) => {
  const [friends, setFriends] = useState<Invitation[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await fetchFriends();
        if (data.data) {
          setFriends(data.data);
        }
      } catch (error) {}
    };
    fetch();
  }, []);

  return (
    <div className="relative px-4 pt-8 overflow-y-auto h-full hidden-scrollbar">
      <h1 className="text-center text-2xl font-medium">
        Invite friends
        <br />
        and get more BAITS
      </h1>
      <div className="flex justify-center mt-5">
        <img src={HookImage} alt="hook" />
      </div>
      <div className="flex flex-col h-full">
        {friends.length > 0 && <p>{friends.length} friends</p>}
        <div className="mt-6 flex- h-full">
          {friends.map((friend, index) => (
            <div
              key={index}
              className={`flex items-center justify-between ${index !== friends.length - 1 ? 'mb-6' : ''}`}
            >
              <div>
                <Avatar
                  classNames={{
                    name: `font-medium`,
                  }}
                  color={getRandomColor(parseInt(friend.invitedUser.id, 10))}
                  showFallback
                  name={getInitials(friend.invitedUser.userName)}
                />
              </div>
              <div className="flex-1 px-4">
                <p>{friend.invitedUser.userName}</p>
              </div>
              <div>
                <p>+100 BAITS</p>
              </div>
            </div>
          ))}
        </div>
        <InviteGroup />
      </div>
    </div>
  );
};

export default FriendsPage;
