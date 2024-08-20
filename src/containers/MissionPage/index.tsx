import { Missions, useSharkStore } from '@/stores/shark_store';
import { useEffect } from 'react';
import MissionItem, { MissionStatus } from './MissionItem';
import MisstionTypeWrapper from './MisssionTypeWrapper';

type Props = {};

const MissionPage = (props: Props) => {
  const { missions } = useSharkStore();

  if (!missions) return null;
  return (
    <div className="w-full h-full px-4 pt-9 overflow-y-auto">
      <h1 className="text-center text-2xl font-medium mb-6">Missions</h1>

      <div>
        {missions.map((mission, index) => {
          return (
            <div key={index} className={`${index !== missions.length - 1 ? 'mb-5' : ''}`}>
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
