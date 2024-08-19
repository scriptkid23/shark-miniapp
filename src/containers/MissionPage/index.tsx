import { Missions, useSharkStore } from '@/stores/shark_store';
import MissionItem, { MissionStatus } from './MissionItem';
import MisstionTypeWrapper from './MisssionTypeWrapper';
import { useTonConnectUI } from '@tonconnect/ui-react';

type Props = {};

const MockMission: Missions[] = [
  {
    type: 'ton-native',
    name: 'TON Native',
    missions: [
      {
        id: 1,
        description: 'Make a transaction',
        value: 1000,
        iconId: 1,
        status: MissionStatus.PENDING,
      },
      {
        id: 2,
        description: 'Become a realShark',
        value: 120000,
        iconId: 2,
        status: MissionStatus.ACTIVE,
      },
    ],
  },
  {
    type: 'loyalty',
    name: 'SHARK Loyalty',
    missions: [
      {
        id: 3,
        description: 'Follow twitter SHARKS',
        value: 1000,
        iconId: 3,
        status: MissionStatus.DONE,
      },
      {
        id: 4,
        description: 'Join SHARKS Telegram channel',
        value: 1000,
        iconId: 4,
        status: MissionStatus.ACTIVE,
      },
    ],
  },
  {
    type: 'daily',
    name: 'SHARK DAILY',
    missions: [
      {
        id: 5,
        description: 'Invite a friend',
        value: 500,
        iconId: 3,
        status: MissionStatus.ACTIVE,
      },
    ],
  },
];
const transaction1 = {
  validUntil: Math.floor(Date.now() / 1000) + 360,
  messages: [
    {
      address: '0:412410771DA82CBA306A55FA9E0D43C9D245E38133CB58F1457DFB8D5CD8892F', // destination address
      amount: '20000000', //Toncoin in nanotons
    },
  ],
};

const MissionPage = (props: Props) => {
  return (
    <div className="w-full h-full px-4 pt-9 overflow-y-auto">
      <h1 className="text-center text-2xl font-medium mb-6">Missions</h1>

      <div>
        {MockMission.map((mission, index) => {
          return (
            <div key={index} className={`${index !== MockMission.length - 1 ? 'mb-5' : ''}`}>
              <MisstionTypeWrapper title={mission.name}>
                <div className="mt-5">
                  {mission.missions.map((missionItem, index) => {
                    return (
                      <div key={index} className={`${index !== mission.missions.length - 1 ? 'mb-5' : ''}`}>
                        <MissionItem mission={missionItem} />
                      </div>
                    );
                  })}
                </div>
              </MisstionTypeWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionPage;
