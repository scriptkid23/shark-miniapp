import HookImage from "@/assets/images/hook-color.png";
import InviteGroup from "./InviteGroup";
import { useEffect, useState } from "react";
import { fetchFriends } from "@/apis";
import { Avatar } from "@nextui-org/react";
import { getInitials, getRandomColor } from "@/utils";
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
              className={`flex items-center justify-between ${
                index !== friends.length - 1 ? "mb-6" : ""
              }`}
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
